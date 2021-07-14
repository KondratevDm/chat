const CHANGE_CREATE_CHANNEL_MODAL_STATE = 'CHANGE_CREATE_CHANNEL_MODAL_STATE'
const CREATE_CHANNEL_NAME = 'CREATE_CHANNEL_NAME'
const CREATE_CHANNEL_DESCRIPTION = 'CREATE_CHANNEL_DESCRIPTION'
const CREATE_СHANNEL = 'CREATE_СHANNEL'

const initialState = {
  isCreateChannelModalActive: false,
  newChannelName: '',
  newChannelDescription: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CREATE_CHANNEL_MODAL_STATE: {
      return {
        isCreateChannelModalActive: !state.isCreateChannelModalActive
      }
    }
    case CREATE_CHANNEL_NAME: {
      return {
        ...state,
        newChannelName: action.data
      }
    }
    case CREATE_CHANNEL_DESCRIPTION: {
      return {
        ...state,
        newChannelDescription: action.data
      }
    }
    default:
      return state
  }
}

export function changeCreateChannelModalState() {
  return (dispatch) => {
    dispatch({ type: CHANGE_CREATE_CHANNEL_MODAL_STATE })
  }
}

export function createChannelName(data) {
  return (dispatch) => {
    dispatch({ type: CREATE_CHANNEL_NAME, data })
  }
}

export function createChannelDescription(data) {
  return (dispatch) => {
    dispatch({ type: CREATE_CHANNEL_DESCRIPTION, data })
  }
}

export function createChannel() {
  return (dispatch, getState) => {
    const { newChannelName, newChannelDescription } = getState().createChannelModal
    fetch('/api/v1/newchannel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newChannelName, newChannelDescription })
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: CREATE_СHANNEL, token: data.token })
        window.location = ''
      })
  }
}
