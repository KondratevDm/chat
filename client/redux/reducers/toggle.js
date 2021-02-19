const CHANGE_SIDEBAR_TOGGLE_STATE = 'CHANGE_SIDEBAR_TOGGLE_STATE'

const initialState = {
  isSidebarToggleModalActive: false,

}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SIDEBAR_TOGGLE_STATE: {
      return {
        isSidebarToggleModalActive: !state.isSidebarToggleModalActive
      }
    }
    default:
      return state
  }
}

export function changeSidebarToggleState() {
  return (dispatch) => {
    dispatch({ type: CHANGE_SIDEBAR_TOGGLE_STATE })
  }
}

