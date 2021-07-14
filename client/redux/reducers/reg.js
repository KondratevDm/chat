// import axios from 'axios'
import { history } from '..'

const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const CREATE_USER = 'CREATE_USER'

const initialState = {
  username: '',
  email: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME: {
      return {
        ...state,
        username: action.username
      }
    }
    case UPDATE_EMAIL: {
      return {
        ...state,
        email: action.email
      }
    }
    case UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    default:
      return state
  }
}

export function createUsernameField(username) {
  return { type: UPDATE_USERNAME, username }
}

export function createEmailField(email) {
  return { type: UPDATE_EMAIL, email }
}

export function createPasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function createUser() {
  return (dispatch, getState) => {
    const { username, email, password } = getState().reg
    fetch('/api/v1/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: CREATE_USER, token: data.token })
        history.push('/login')
      })
  }
}
