import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Footer from './footer'

import {
  createUsernameField,
  createEmailField,
  createPasswordField,
  createUser
} from '../redux/reducers/reg'
import Head from './head'

const Registration = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, 'Mininum 4 characters')
        .max(12, 'Maximum 12 characters')
        .required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required!'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], "Password's not match")
        .required('Required!')
    }),
    onSubmit: (values) => {
      dispatch(createUsernameField(values.username))
      dispatch(createEmailField(values.email))
      dispatch(createPasswordField(values.password))
      dispatch(createUser())
    }
  })

  return (
    <div className="h-screen w-screen">
      <Head title="Registration" />
      <div className="w-5/6 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-1/3 2xl:w-1/3 px-6 flex justify-center flex-col  h-full mx-auto ">
        <form onSubmit={formik.handleSubmit}>
          <p className="font-medium text-center text-2xl mb-5 text-black">Create a profile</p>

          <div className="py-2">
            <div className="flex flex-row justify-between">
              <span className="px-1 text-sm text-gray-600">Username</span>
              {formik.errors.username && formik.touched.username && (
                <p className="px-1 text-sm text-red-600">{formik.errors.username}</p>
              )}
            </div>
            <input
              placeholder=""
              type="text"
              name="username"
              value={formik.values.username}
              x-model="password_confirm"
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              onChange={formik.handleChange}
            />
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

          <div className="py-2">
            <div className="flex flex-row justify-between">
              <span className="px-1 text-sm text-gray-600">Confirm Password</span>
              {formik.errors.confirm_password && formik.touched.confirm_password && (
                <p className="px-1 text-sm text-red-600">{formik.errors.confirm_password}</p>
              )}
            </div>

            <input
              placeholder=""
              type="password"
              x-model="confirm_password"
              name="confirm_password"
              value={formik.values.confirm_password}
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              onChange={formik.handleChange}
            />
          </div>

          <button
            type="submit"
            className="mt-3 text-lg focus:outline-none font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
          >
            Register
          </button>
        </form>
        <hr className="mb-2 mt-5 border-t border-teal-500" />

        <div className="text-sm font-semibold block py-4 flex justify-center">
          <Link
            to="/login"
            className="text-black text-center font-normal border-b border-gray-200 hover:border-teal-500"
          >
            Already have a profile? Login!
          </Link>
        </div>
        < Footer />
      </div>
    </div>
  )
}

Registration.propTypes = {}

export default Registration
