import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import reg from './reg'
import createChannelModal from './createChannelModal'
import channels from './channels'
import message from './message'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    reg,
    createChannelModal,
    channels,
    message
  })

export default createRootReducer
