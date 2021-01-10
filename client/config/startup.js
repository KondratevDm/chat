import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { trySignIn, tryGetUserInfo } from '../redux/reducers/auth'

const Startup = (props) => {
  const token = useSelector((s) => s.auth.token)
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
    }
    dispatch(tryGetUserInfo())
  }, [])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
