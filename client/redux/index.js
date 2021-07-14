import { createStore, applyMiddleware, compose } from 'redux'
// import { useDispatch } from 'react-redux'
import { routerMiddleware } from 'connected-react-router'
import io from 'socket.io-client'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { updateMessagesFromSocket } from './reducers/message'
import { updateOnlineUsers } from './reducers/channels'

import rootReducer from './reducers'
import createHistory from './history'


export const history = createHistory()
// const dispatch = useDispatch()


const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)

let socket

export function createSocket(token) {
  socket = io(window?.location?.origin, {
    reconnection: true,
    reconnectionDelay: 500,
    autoConnect: true,
    reconnectionAttempts: 50,
    auth: {
      token
    }
  })

  socket.on('chat message', function (data) {
    // dispatch(updateMessagesFromSocket(data))
   store.dispatch(updateMessagesFromSocket(data))
  })

  socket.on('Online users', function (data) {
    // dispatch(updateOnlineUsers(data))
   store.dispatch( updateOnlineUsers(data))
  })

}




export function getSocket() {
  return socket
}
export default store
