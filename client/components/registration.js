import React from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   createUsernameField,
//   createEmailField,
//   createPasswordField,
//   createUser
// } from '../redux/reducers/registration'
import Head from './head'

const Registration = () => {
  // const dispatch = useDispatch()
  // const username = useSelector((s) => s.registration.username)
  // const email = useSelector((s) => s.registration.email)
  // const password = useSelector((s) => s.registration.password)

  return (
    <div>
      <Head title="Registration" />
      <div className="container max-w-full mx-auto md:py-24 px-6">
        <div className="max-w-sm mx-auto px-6">
          <div className="relative flex flex-wrap">
            <div className="w-full relative">
              <div className="md:mt-6">
                <div className="text-center font-semibold text-2xl text-black">
                  Create a profile
                </div>
                <form className="mt-8" x-data="{password: '',password_confirm: ''}">
                  <div className="mx-auto max-w-lg ">
                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Username</span>
                      <input
                        placeholder=""
                        type="text"
                        // value={username}
                        className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        // onChange={(e) => {
                          // dispatch(createUsernameField(e.target.value))
                        // }}
                      />
                    </div>

                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Email</span>
                      <input
                        placeholder=""
                        type="email"
                        x-model="password_confirm"
                        // value={email}
                        className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        // onChange={(e) => {
                        //   dispatch(createEmailField(e.target.value))
                        // }}
                      />
                    </div>

                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Password</span>
                      <input
                        placeholder=""
                        type="password"
                        x-model="password"
                        // value={password}
                        className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        // onChange={(e) => {
                        //   dispatch(createPasswordField(e.target.value))
                        // }}
                      />
                    </div>

                    <button
                      type="button"
                      className="mt-3 text-lg focus:outline-none font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                      // onClick={() => {
                      //   dispatch(createUser())
                      // }}
                    >
                      Register
                    </button>

                    <hr className="mb-2 mt-5 border-t border-teal-500" />

                    <div className="text-sm font-semibold block py-4 flex justify-center">
                      <Link
                        to="/login"
                        className="text-black font-normal border-b border-gray-200 hover:border-teal-500"
                      >
                        Already have a profile? Login!
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Registration.propTypes = {}

export default Registration
