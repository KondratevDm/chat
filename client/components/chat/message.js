import React, {
  useState,
   useEffect
} from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import { getSocket } from '../../redux/index'

const Message = () => {
  const date = new Date()
  const [messagesArr, setMessagesArr] = useState([])
  const socket = getSocket()
  const user = useSelector((s) => s.auth.user)

  useEffect(() => {
    const handler = function (msg) {
      setMessagesArr([...messagesArr, msg])
      console.log(messagesArr)
    }
    socket.on('chat message', handler)
    return () => {
      socket.off('chat message', handler)
    }
  }, [messagesArr])


  // useEffect(() => {
  //   socket.on('chat message', function (msg) {
  //     setMessagesArr([...messagesArr, msg])
  //     console.log(msg)
  //   })
  // }, [])

  return (
    <div className="w-5/6 pt-0 ">
      {messagesArr.map((element) => (
        <div key={nanoid()} className="flex items-start mb-4">
          {' '}
          {/* o4en' ploho  key={nanoid()}
          doljno bit' key={element.id}

          */}
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
              {/* 2 */}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

Message.propTypes = {}

export default Message
