import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
// import { toast } from 'react-toastify'
// import { io } from 'socket.io-client'
import io from 'socket.io-client'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import SockJS from 'sockjs-client'
import Cookies from 'universal-cookie'
import rootReducer from './reducers'
import createHistory from './history'
// import socketActions from './sockets'

export const history = createHistory()
const cookies = new Cookies()

const socket = io(window?.location?.origin, {
  reconnection: true,
  reconnectionDelay: 500,
  autoConnect: true,
  reconnectionAttempts: 50,
  auth: {
    token: cookies.get('token', { path: '/' })
  }
})

// const isBrowser = typeof window !== 'undefined'

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)
// let socket

// if (typeof ENABLE_SOCKETS !== 'undefined' && ENABLE_SOCKETS) {
//   const initSocket = () => {
//     socket = new SockJS(`${isBrowser ? window.location.origin : 'http://localhost'}/ws`)

//     socket.onopen = () => {
//       store.dispatch(socketActions.connected)
//     }

//     socket.onmessage = (message) => {
//       // eslint-disable-next-line no-console
//       console.log(message)
//       // socket.close();
//     }

//     // socket.onmessage = ({data}) => {
//     //   store.dispatch(JSON.parse(data))
//     //   toast(JSON.parse(data).message)
//     // }

//     socket.onclose = () => {
//       store.dispatch(socketActions.disconnected)
//       setTimeout(() => {
//         initSocket()
//       }, 2000)
//     }
//   }

//   // initSocket()
// }

export function getSocket() {
  return socket
}
export default store
