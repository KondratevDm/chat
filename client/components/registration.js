import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createUsernameField,
  createEmailField,
  createPasswordField,
  createUser
} from '../redux/reducers/reg'
import Head from './head'

const Registration = () => {
  const dispatch = useDispatch()
  const username = useSelector((s) => s.reg.username)
  const email = useSelector((s) => s.reg.email)
  const password = useSelector((s) => s.reg.password)

  return (
    <div className="h-screen w-screen">
      <Head title="Registration" />
      <div className="w-5/6 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-1/4 2xl:w-1/4 px-6 flex justify-center flex-col  h-full mx-auto ">
        <p className="font-medium text-center text-2xl mb-5 text-black">Create a profile</p>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600">Username</span>
          <input
            placeholder=""
            type="text"
            value={username}
            x-model="password_confirm"
            className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            onChange={(e) => {
              dispatch(createUsernameField(e.target.value))
            }}
          />
        </div>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600">Email</span>
          <input
            placeholder=""
            type="email"
            value={email}
            x-model="password_confirm"
            className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            onChange={(e) => {
              dispatch(createEmailField(e.target.value))
            }}
          />
        </div>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600">Password</span>
          <input
            placeholder=""
            type="password"
            x-model="password"
            value={password}
            className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            onChange={(e) => {
              dispatch(createPasswordField(e.target.value))
            }}
          />
        </div>

        <button
          type="button"
          className="mt-3 text-lg focus:outline-none font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
          onClick={() => {
            dispatch(createUser())
          }}
        >
          Log in
        </button>

        <hr className="mb-2 mt-5 border-t border-teal-500" />

        <div className="text-sm font-semibold block py-4 flex justify-center">
          <Link
            to="/login"
            className="text-black text-center font-normal border-b border-gray-200 hover:border-teal-500"
          >
            Already have a profile? Login!
          </Link>
        </div>
      </div>
    </div>
  )
}

Registration.propTypes = {}

export default Registration
