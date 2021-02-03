// import axios from 'axios'

const GET_CHANNELS_INFO = 'GET_CHANNELS_INFO'
const UPDATE_ACTIVE_CHANNEL = 'UPDATE_ACTIVE_CHANNEL'


const initialState = {
  channels: [],
  activeChannel: 'general'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS_INFO: {
      return { ...state, channels: action.data }
    }
    case UPDATE_ACTIVE_CHANNEL: {
      return { ...state, activeChannel: action.data }
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


