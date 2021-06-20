import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'


const UPDATE_EMAIL = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const ERROR_MESSAGE = 'ERROR_MESSAGE'

const cookies = new Cookies()

const initialState = {
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {},
  errorMessage: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EMAIL: {
      return { ...state, email: action.email }
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case LOGIN: {
      return { ...state, token: action.token, password: '', user: action.user }
    }
    case ERROR_MESSAGE: {
      return { ...state, errorMessage: true }
    }
    default:
      return state
  }
}

export function updateEmailField(email) {
  return { type: UPDATE_EMAIL, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function loginFunction() {
  return (dispatch, getState) => {
    const { email, password } = getState().auth
    axios.post('/api/v1/auth',
      JSON.stringify({
        email,
        password
      }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({data}) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push('/chat')
      })
      .catch((err) => {
        dispatch({ type: ERROR_MESSAGE })
        console.log(err)
      })
  }
}

// export function loginFunction() {
//   return (dispatch, getState) => {
//     const { email, password } = getState().auth
//     fetch('/api/v1/auth', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email,
//         password
//       })
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         dispatch({ type: LOGIN, token: data.token, user: data.user })
//         history.push('/chat')
//       })
//       .catch((err) => {
//         dispatch({ type: ERROR_MESSAGE })
//         console.log(err)
//       })
//   }
// }

export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push('/chat')
      })
  }
}

export function tryGetUserInfo() {
  return () => {
    fetch('/api/v1/user-info')
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }
}