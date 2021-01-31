// import axios from 'axios'

const GET_CHANNELS_INFO = 'GET_CHANNELS_INFO'


const initialState = {
  channels: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS_INFO: {
      return { ...state, channels: action.data }
    }
    default:
      return state
  }
}

export function getChannelsInfo(data) {
  return { type: GET_CHANNELS_INFO, data }
}

// function getChannels() {
//   const channelsFromDB = axios.get('/api/v1/channels')
//   setChannels(channelsFromDB.data)
// }

