import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport.js'
import auth from './middleware/auth'
import Html from '../client/html'
import User from './model/User.model'
import Channel from './model/Channels.model'
import config from './config'
import { instanceOf } from 'prop-types'
const Root = () => ''

mongooseService.connect()

try {
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.get('/api/v1/user-info', auth(['admin']), (req, res) => {
  res.json({ users: connections.map((t) => t.userInfo) })
})

server.get('/api/v1/test/cookies', (req, res) => {
  console.log(req.cookies)
  res.cookie('serverCookie', 'test', { maxAge: 90000, httpOnly: true })
  res.json({ status: res.cookies })
})

server.post('/api/v1/auth', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.status(501).json({ status: 'Error', err })
  }
})

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/reg', (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  user.save()
  res.json({ status: 'ok' })
})

server.post('/api/v1/newchannel', async (req, res) => {
  try {
    const channel = new Channel({
      channelName: req.body.newChannelName,
      channelDescription: req.body.newChannelDescription
    })
    await channel.save()
    console.log(`Channel ${req.body.newChannelName} added to the DataBase`)
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/channels', async (req, res) => {
  try {
    const channels = await Channel.find()
    res.json({ channels })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/chat/:channel', async (req, res) => {
  const { channel } = req.params
  try {
    const activeChannel = await Channel.find({ channelName: channel })
    res.json(activeChannel)
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.put('/api/v1/chat/:channel', async (req, res) => {
  const { channel } = req.params
  const { body } = req
  try {
    await Channel.updateOne(
      { channelName: channel },
      { $push: { channelMessages: body } },
      { upsert: true }
    )
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/chat/messages/:channel', async (req, res) => {
  const { channel } = req.params
  try {
    const activeChannel = await Channel.find({ channelName: channel })
    const messages = activeChannel[0].channelMessages
    res.json(messages)
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/name-of-users', async (req, res) => {
  try {
    const nameOfUsers = await User.find()
    res.json(nameOfUsers.map((it) => it.username))
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const http = require('http').createServer(server)
const io = require('socket.io')(http)


http.listen(port, () => {
  console.log(`listening on *:${port}`)
})



let onlineUsers = []
let onlineUsersInfo = []

io.on('connection', async function (socket) {
  const { token } = socket.handshake.auth
  const jwtUser = jwt.verify(token, config.secret)
  const user = await User.findById(jwtUser.uid)
  onlineUsers.push(user.username)


  socket.on('Join chat', (activeChannel) => {
    let userInfo = {
      id: socket.id,
      room: activeChannel
    }
    io.emit('Online users', onlineUsers)
    onlineUsersInfo.push(userInfo)

  })

  socket.on('Update Online Users Info', (activeChannel) => {
    onlineUsersInfo.map((it) => {
      if (it.id === socket.id) {
        it.room = activeChannel
      }
    })
  })


  socket.on('chat message', (data) => {
    const userInCurrentRoom = onlineUsersInfo.filter((it) => it.room === data.room)
    userInCurrentRoom.forEach((it) => {
      io.to(`${it.id}`).emit('chat message', data)
    })
  })

  

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((it) => it !== user.username)
    onlineUsersInfo = onlineUsersInfo.filter((it) => it.id !== socket.id)
    io.emit('Online users', onlineUsers)
  })
})



console.log(`Serving at http://localhost:${port}`)
