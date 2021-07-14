// import axios from 'axios'
import { getSocket } from '../index'

// const socket = getSocket()
const GET_CHANNELS_INFO = 'GET_CHANNELS_INFO'
const UPDATE_ACTIVE_CHANNEL = 'UPDATE_ACTIVE_CHANNEL'
const UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS'

const initialState = {
  channels: [],
  activeChannel: 'general',
  onlineUsers: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS_INFO: {
      return { ...state, channels: action.data }
    }
    case UPDATE_ACTIVE_CHANNEL: {
      return { ...state, activeChannel: action.data }
    }
    case UPDATE_ONLINE_USERS: {
      return { ...state, onlineUsers: action.data }
    }
    default:
      return state
  }
}


export function getChannelsInfo(data) {
  return { type: GET_CHANNELS_INFO, data }
}


export function updateActiveChannels(data) {
  return { type: UPDATE_ACTIVE_CHANNEL, data }
}

// export function userJoinToChat() {
//   return function () {
//     console.log('кто-то зашел', socket)
//     socket?.emit('Join chat')
//     // socket?.emit('Join chat')
//   }
// }

export function userJoinToChat() {
  return function () {
    getSocket().emit('Join chat')
  }
}

export function updateOnlineUsers(data) {
  return { type: UPDATE_ONLINE_USERS, data }
}
