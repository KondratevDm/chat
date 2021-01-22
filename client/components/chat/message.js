import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import { getSocket } from '../../redux/index'

const Message = () => {
  const [messagesArr, setMessagesArr] = useState([])
  const socket = getSocket()

  socket.on('chat message', function (msg) {
    setMessagesArr([...messagesArr, msg])
  })

  return (
    <div className="w-5/6 pt-0 ">
      {messagesArr.map((element) => (
        <div key={nanoid()} className="flex items-start mb-4">
          <img
            src="https://i.imgur.com/qACoKgY.jpg"
            className="w-10 h-10 rounded mr-3 mt-1"
            alt="profile-pic"
          />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold mr-2 font-sans">Adam Bishop</span>
              <span className="text-black text-sm opacity-50 font-light">12:46</span>
            </div>
            <p id="pizda" className="font-light text-gray-900">
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
