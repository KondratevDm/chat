import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import reg from './reg'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    reg
  })

export default createRootReducer
