import { getSocket } from '../index'

const GET_CHANNELS_INFO = 'GET_CHANNELS_INFO'
const UPDATE_ACTIVE_CHANNEL = 'UPDATE_ACTIVE_CHANNEL'
const UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS'
const UPDATE_ONLINE_USERS_INFO = 'UPDATE_ONLINE_USERS_INFO'

const initialState = {
  channels: [],
  activeChannel: 'general',
  onlineUsers: [],
  onlineUsersInfo: []
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
    case UPDATE_ONLINE_USERS_INFO: {
      return { ...state, onlineUsersInfo: action.data }
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

export function userJoinToChat(data) {
  return function () {
    getSocket().emit('Join chat', data)
  }
}

export function updateOnlineUsers(data) {
  return { type: UPDATE_ONLINE_USERS, data }
}

export function updateOnlineUsersInfo(data) {
  return function () {
    getSocket().emit('Update Online Users Info', data)
  }
}
