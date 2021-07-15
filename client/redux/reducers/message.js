import { getSocket } from '../index'

const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const UPDATE_SENDING_TIME = 'UPDATE_SENDING_TIME'
const SEND = 'SEND'
const UPDATE_MESSAGES_FROM_SOCKET = 'UPDATE_MESSAGES_FROM_SOCKET'
const NULLIFY_MESSAGES_FROM_SOCKET ='NULLIFY_MESSAGES_FROM_SOCKET'


const initialState = {
  message: '',
  sendingTime: '',
  messagesFromSocket: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE: {
      return { ...state, message: action.message }
    }
    case UPDATE_SENDING_TIME: {
      return { ...state, sendingTime: action.sendingTime }
    }
    case SEND: {
      return { ...state, message: '' }
    }
    case UPDATE_MESSAGES_FROM_SOCKET: {
      return { ...state, messagesFromSocket: [...state.messagesFromSocket, action.data] }
    }
    case NULLIFY_MESSAGES_FROM_SOCKET: {
      return { ...state, messagesFromSocket: [] }
    }
    default:
      return state
  }
}


export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, message }
}

export function updateSendingTime(sendingTime) {
  return { type: UPDATE_SENDING_TIME, sendingTime }
}

export function sendMessage() {
  return (dispatch, getState) => {
    const { username } = getState().auth.user
    const { message, sendingTime } = getState().message
    const { activeChannel } = getState().channels
    fetch(`/api/v1/chat/${activeChannel}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        message,
        sendingTime
      })
    })
      .then((r) => r.json())
      .then(() => {
        dispatch({ type: SEND })
        getSocket().emit('chat message', {
          message,
          username,
          sendingTime,
          room: activeChannel
        })
      })
  }
}

export function updateMessagesFromSocket(data) {
  return { type: UPDATE_MESSAGES_FROM_SOCKET, data }
}

export function nullifyMessagesFromSocket() {
  return { type: NULLIFY_MESSAGES_FROM_SOCKET }
}

