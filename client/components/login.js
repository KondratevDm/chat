import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateEmailField, updatePasswordField, loginFunction } from '../redux/reducers/auth'

import Head from './head'

const Login = () => {
  const dispatch = useDispatch()
  const errorMessage = useSelector((s) => s.auth.errorMessage)
  // const password = useSelector((s) => s.auth.password)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required!'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required!'),
    }),
    onSubmit: (values) => {
      dispatch(updateEmailField(values.email))
      dispatch(updatePasswordField(values.password))
      dispatch(loginFunction())
    }
  })

  return (
    <div className="h-screen w-screen">
      <Head title="Login" />
      <div className="w-5/6 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-1/4 2xl:w-1/4 px-6 flex justify-center flex-col  h-full mx-auto ">
        <form onSubmit={formik.handleSubmit}>
          <p className="font-medium text-center text-2xl mb-5 text-black">Login a profile</p>

          <div
            className={
              errorMessage
              ? "bg-red-200  py-4 mx-2 my-4 rounded-md text-lg flex items-center mx-auto w-full"
              : "hidden"
            }
          >
            <div className="ml-auto mr-auto">
              <span className="text-red-800 text-sm">The email address or password is incorrect</span>
            </div>

          </div>


          <div className="py-2">
            <div className="flex flex-row justify-between">
              <span className="px-1 text-sm text-gray-600">Email</span>
              {formik.errors.email && formik.touched.email && (
                <p className="px-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>
            <input
              placeholder=""
              type="mail"
              name="email"
              value={formik.values.email}
              x-model="password_confirm"
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              onChange={formik.handleChange}
            />
          </div>

          <div className="py-2">
            <div className="flex flex-row justify-between">
              <span className="px-1 text-sm text-gray-600">Password</span>
              {formik.errors.password && formik.touched.password && (
                <p className="px-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
            <input
              placeholder=""
              type="password"
              x-model="password"
              name="password"
              value={formik.values.password}
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              onChange={formik.handleChange}
            />
          </div>

          <button
            type="submit"
            className="mt-3 text-lg focus:outline-none font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
          // onClick={() => {
          //   dispatch(loginFunction())
          // }}
          >
            Log in
          </button>
        </form>

        <hr className="mb-2 mt-5 border-t border-teal-500" />

        <div className="text-sm font-semibold block py-4 flex justify-center">
          <Link
            to="/registration"
            className="text-black text-center font-normal border-b border-gray-200 hover:border-teal-500"
          >
            Already don`t have a profile? Register!
          </Link>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {}

export default Login
