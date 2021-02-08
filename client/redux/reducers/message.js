const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const UPDATE_SENDING_TIME = 'UPDATE_SENDING_TIME'
const SEND = 'SEND'

const initialState = {
  message: '',
  sendingTime: ''
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
    default:
      return state
  }
}

export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, message }
}

// setInterval(function updateSendingTime() {
//   let h = new Date().getHours()
//   let m = new Date().getMinutes()

//   h = h < 10 ? 0 + h : h
//   m = m < 10 ? 0 + m : m
//   const data = `${h}:${m}`

//   return { type: UPDATE_SENDING_TIME, data }
// }, 1000)

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
      })
  }
}
