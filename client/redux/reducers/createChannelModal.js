const CHANGE_CREATE_CHANNEL_MODAL_STATE = 'CHANGE_CREATE_CHANNEL_MODAL_STATE'


const initialState = {
  isCreateChannelModalActive: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CREATE_CHANNEL_MODAL_STATE: {
      return {
        isCreateChannelModalActive: !state.isCreateChannelModalActive
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

// export function createUser(data) {
//   return (dispatch) => {
//     dispatch({ type: changeAddChannelModalState, data })
//   }
// }
