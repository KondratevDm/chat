import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { nanoid } from 'nanoid'
import axios from 'axios'
import Message from './message'
import { getSocket } from '../../redux/index'

const MessagesWindow = () => {
  const [activeChannelName, setActiveChannelName] = useState('')
  const [activeChannelDescription, setActiveChannelDescription] = useState('')
  const activeChannel = useSelector((s) => s.channels.activeChannel)

  const isCreateChannelModalActive = useSelector(
    (s) => s.createChannelModal.isCreateChannelModalActive
  )

  function getChannelData() {
    axios.get(`/api/v1/chat/${activeChannel}`).then(({ data }) => {
      setActiveChannelName(data[0].channelName)
      setActiveChannelDescription(data[0].channelDescription)
    })
  }

  useEffect(() => {
    getChannelData()
  }, [activeChannel])

  const socket = getSocket()
  const [inputValue, setInputValue] = useState('')
  // const [messagesArr, setMessagesArr] = useState([])

  const onChange = (e) => {
    setInputValue(e.target.value)
  }

  const buttonPressEvent = () => {
    if (inputValue) {
      socket.emit('chat message', inputValue)
      setInputValue('')
    }
  }

  const enterPressEvent = (e) => {
    if (e.key === 'Enter') {
      buttonPressEvent()
    }
  }

  // socket.on('chat message', function (msg) {
  //   setMessagesArr([...messagesArr, msg])
  //   // console.log(messagesArr, msg)
  // })

  return (
    <div
      className={
        isCreateChannelModalActive
          ? 'opacity-50 z-0 w-5/6 ml-auto pt-0 h-full'
          : 'w-5/6 ml-auto pt-0 h-full'
      }
    >
      <div className="w-full flex flex-col my-auto h-full">
        {/* <!-- Top bar --> */}
        <div className="border-b rounded-b-lg flex px-6 items-center h-10">
          <div className="flex flex-row items-center">
            <h1 className="text-2xl opacity-50 mr-1">#</h1>
            <p className="text-lg opacity-75 font-bold mr-3">{activeChannelName}</p>
            <span className="border-r-2 h-5 border-opacity-50 mr-3" />
            <div className="opacity-50 text-base">{activeChannelDescription}</div>
          </div>
        </div>

        {/* <!-- Chat messages --> */}
        <div
          id="messages"
          className="px-6 py-4 flex-1 overflow-scroll-x overflow-y-auto flex-grow flex flex-col"
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

        <div className="flex ml-6 mr-6 mt-10  overflow-hidden">
          <input
            type="text"
            autoComplete="off"
            value={inputValue}
            placeholder="Message to #general"
            className="w-full mt-2  mb-6 px-6 py-2 border-gray-700 border rounded-l-lg text-gray-900 font-light focus:outline-none"
            onChange={onChange}
            onKeyPress={enterPressEvent}
          />

          <div className="mt-2">
            <button
              type="button"
              className="bg-white text-gray-900 border-gray-700 font-light rounded-r-lg border hover:border-green-600 hover:bg-green-500 focus:outline-none hover:text-white py-2 px-6 inline-flex items-center"
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
