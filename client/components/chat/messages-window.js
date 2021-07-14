import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { nanoid } from 'nanoid'
import axios from 'axios'
import Message from './message'
import Toggle from '../toggle'
import { getSocket } from '../../redux/index'
import { updateMessage, sendMessage, updateSendingTime } from '../../redux/reducers/message'

const MessagesWindow = () => {
  const socket = getSocket()
  const dispatch = useDispatch()
  const [activeChannelName, setActiveChannelName] = useState('')
  const [activeChannelDescription, setActiveChannelDescription] = useState('')
  const activeChannel = useSelector((s) => s.channels.activeChannel)
  // const user = useSelector((s) => s.auth.user)
  const isCreateChannelModalActive = useSelector(
    (s) => s.createChannelModal.isCreateChannelModalActive
  )

  function getChannelData() {
    axios.get(`/api/v1/chat/${activeChannel}`).then(({ data }) => {
      setActiveChannelName(data[0].channelName)
      setActiveChannelDescription(data[0].channelDescription)
    })
  }

  function getActualTime() {
    const monthsArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const time = new Date()
    let hour = time.getHours()
    let minute = time.getMinutes()
    const day = time.getDate()
    const month = monthsArr[time.getMonth()]

    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute

    const data = `${hour}:${minute}, ${day} ${month}`
    return data
  }

  useEffect(() => {
    getChannelData()
    socket?.emit('Change Room', activeChannel)
  }, [activeChannel])

  const [inputValue, setInputValue] = useState('')

  const onChange = (e) => {
    setInputValue(e.target.value)
    dispatch(updateMessage(e.target.value))
  }

  // const buttonPressEvent = () => {
  //   if (inputValue) {
  //     socket.emit('chat message', inputValue)
  //     dispatch(updateSendingTime(getActualTime()))
  //     dispatch(sendMessage())
  //     setInputValue('')
  //   }
  // }

  const buttonPressEvent = () => {
    if (inputValue) {
      // socket.emit('chat message', {
      //   message: inputValue,
      //   username: user.username,
      //   sendingTime: getActualTime(),
      //   room: activeChannel
      // })
      dispatch(updateSendingTime(getActualTime()))
      dispatch(sendMessage())
      setInputValue('')
    }
  }

  const enterPressEvent = (e) => {
    if (e.key === 'Enter') {
      buttonPressEvent()
    }
  }

  return (
    <div
      className={
        isCreateChannelModalActive
          ? ' z-0  ml-auto   pt-0 h-full w-full sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6'
          : 'ml-auto pt-0  z-0 h-full   sm:w-2/3  md:w-3/4 w-full lg:w-4/5 xl:w-5/6'
      }
    >
      <div className="w-full flex flex-col my-auto h-full">
        {/* <!-- Top bar --> */}
        <div className="border-b  border-purple-900  flex px-6 items-center h-12">
          <div className="flex w-full flex-row items-center">
            <h1 className="text-2xl hidden md:block opacity-50 mr-1">#</h1>
            <Toggle />
            <p className="md:text-lg text-xl opacity-75 font-bold ml-auto mr-auto md:ml-0 md:mr-3">
              {activeChannelName}
            </p>
            <span className="border-r-2 hidden md:block h-5 border-opacity-50 mr-3" />
            <div className=" hidden md:block opacity-50 text-base">{activeChannelDescription}</div>
          </div>
        </div>

        {/* <!-- Chat messages --> */}
        <div
          id="messages"
          className="px-6 flex-1 break-all overflow-scroll-x overflow-y-auto flex-grow flex flex-col"
        >
          {/* <!-- A message --> */}
          <Message />

          {/* <!-- Ignore --> */}
          {/* <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> */}
        </div>

        <div className="flex mx-6 mt-10  ">
          <input
            type="text"
            autoComplete="off"
            value={inputValue}
            placeholder={`Message to #${activeChannel}`}
            className="w-full  mb-6 px-6 py-2 border-gray-700 border border-r-0 rounded-l-lg text-gray-900 font-light focus:outline-none"
            onChange={onChange}
            onKeyPress={enterPressEvent}
          />

          <div className="">
            <button
              type="button"
              className="bg-white text-gray-900 border-gray-700 font-light rounded-r-lg border hover:border-green-600 hover:bg-green-600 focus:outline-none hover:text-white py-2 px-6 inline-flex items-center"
              onClick={buttonPressEvent}
            >
              <span className="mr-2">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                className="mt-1"
                viewBox="0 0 24 24"
              >
                <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

MessagesWindow.propTypes = {}

export default MessagesWindow
