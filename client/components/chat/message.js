import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getSocket } from '../../redux/index'

const Message = () => {

  const [messagesArrFromSocket, setMessagesArrFromSocket] = useState([])
  const [messagesArrFromDB, setMessagesArrFromDB] = useState([])
  const socket = getSocket()
  const activeChannel = useSelector((s) => s.channels.activeChannel)

  useEffect(() => {
    const handler = function (data) {
      setMessagesArrFromSocket([...messagesArrFromSocket, data])
    }
    socket.on('chat message', handler)
    return () => {
      socket.off('chat message', handler)
    }
  }, [messagesArrFromSocket])

  useEffect(() => {
    if (messagesArrFromDB.length !== 0) {
      const lastItem = document.getElementsByClassName('flex items-start mt-4')[
        document.getElementsByClassName('flex items-start mt-4').length - 1
      ]
      lastItem.scrollIntoView(false)
    }
  }, [messagesArrFromDB, messagesArrFromSocket])

  useEffect(() => {
    axios.get(`/api/v1/chat/messages/${activeChannel}`).then(({ data }) => {
      setMessagesArrFromDB(data)
    })
  }, [activeChannel])


  return (
    <div className="w-5/6 pt-0 ">
      {messagesArrFromDB.map((element) => (
        <div key={element.id} className="flex items-start mt-4">
          {' '}
          <img
            src={`https://ui-avatars.com/api/?size=40&name=${element.username}&length=1&font-size=0.5&background=44337a&color=fff`}
            className="w-10 h-10 rounded mr-3 mt-1"
            alt="profile-pic"
          />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold mr-2 font-sans">{element.username}</span>

              <span className="text-black text-sm opacity-50 font-light">
                {element.sendingTime}
              </span>
            </div>
            <p id="" className="font-light text-gray-900">
              {element.message}
            </p>
          </div>
        </div>
      ))}

      {messagesArrFromSocket.map((element) => (
        <div key={element.id} className="flex items-start mt-4">
          {' '}
          <img
            src={`https://ui-avatars.com/api/?size=40&name=${element.user}&length=1&font-size=0.5&background=44337a&color=fff`}
            className="w-10 h-10 rounded mr-3 mt-1"
            alt="profile-pic"
          />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold mr-2 font-sans">{element.user}</span>
              <span className="text-black text-sm opacity-50 font-light">{element.time}</span>
            </div>
            <p id="" className="font-light break-all text-gray-900">
              {element.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

Message.propTypes = {}

export default Message
