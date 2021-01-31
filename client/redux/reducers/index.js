import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import reg from './reg'
import createChannelModal from './createChannelModal'
import channels from './channels'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    reg,
    createChannelModal,
    channels
  })

export default createRootReducer
