import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getSocket } from '../../redux/index'

const Message = () => {
  const date = new Date()
  const [messagesArr, setMessagesArr] = useState([])
  const [newMessagesArr, setNewMessagesArr] = useState([])
  const socket = getSocket()
  const user = useSelector((s) => s.auth.user)
  const activeChannel = useSelector((s) => s.channels.activeChannel)

  useEffect(() => {
    const handler = function (msg) {
      setMessagesArr([...messagesArr, msg])
    }
    socket.on('chat message', handler)
    return () => {
      socket.off('chat message', handler)
    }
  }, [messagesArr])

  useEffect(() => {
    axios.get(`/api/v1/chat/messages/${activeChannel}`).then(({ data }) => {
      setNewMessagesArr(data)
      console.log(newMessagesArr)
    })
  }, [activeChannel])

  // `https://ui-avatars.com/api/?size=40&name={element.username}&font-size=0.33&background=1967c3&color=fff&rounded=true`
  // https://ui-avatars.com/api/?size=40&name=conddd&length=1&font-size=0.7&background=1967c3&color=fff&rounded=true

  return (
    <div className="w-5/6 pt-0 ">
      {newMessagesArr.map((element) => (
        /* {messagesArr.map((element) => ( */
        <div key={element.id} className="flex items-start mb-4">
          {' '}
          <img
            // src={element.username}
            src={`https://ui-avatars.com/api/?size=40&name=${element.username}&length=1&font-size=0.5&background=44337a&color=fff`}
            className="w-10 h-10 rounded mr-3 mt-1"
            alt="profile-pic"
          />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold mr-2 font-sans">{element.username}</span>
              {/* <span className="font-bold mr-2 font-sans">{user.username}</span> */}
              {/* <span className="text-black text-sm opacity-50 font-light">{`${date.getHours()}:${date.getMinutes()}`}</span> */}
              <span className="text-black text-sm opacity-50 font-light">
                {element.sendingTime}
              </span>
            </div>
            <p id="" className="font-light text-gray-900">
              {element.message}
              {/* {element} */}
            </p>
          </div>
        </div>
      ))}

      {messagesArr.map((element) => (
        <div key={element.id} className="flex items-start mb-4">
          {' '}
          <img
            src="https://i.imgur.com/qACoKgY.jpg"
            className="w-10 h-10 rounded mr-3 mt-1"
            alt="profile-pic"
          />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold mr-2 font-sans">{user.username}</span>
              <span className="text-black text-sm opacity-50 font-light">{`${date.getHours()}:${date.getMinutes()}`}</span>
            </div>
            <p id="" className="font-light text-gray-900">
              {element}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

Message.propTypes = {}

export default Message
