import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import reg from './reg'
import createChannelModal from './createChannelModal'
import channels from './channels'
import message from './message'
import toggle from './toggle'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    reg,
    createChannelModal,
    channels,
    message,
    toggle
  })

export default createRootReducer
