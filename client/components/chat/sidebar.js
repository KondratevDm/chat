import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { CSSTransition } from 'react-transition-group'
import CreateChannelModal from '../create-channel-modal'
// import { getSocket } from '../../redux/index'
import { changeCreateChannelModalState } from '../../redux/reducers/createChannelModal'
import { getChannelsInfo, updateActiveChannels, userJoinToChat } from '../../redux/reducers/channels'
import { nullifyMessagesFromSocket } from '../../redux/reducers/message'
import { changeSidebarToggleState } from '../../redux/reducers/toggle'
import '../../../style.css'

const Sidebar = () => {
  const dispatch = useDispatch()
  // const socket = getSocket()
  const activeChannel = useSelector((s) => s.channels.activeChannel)
  const onlineUsersState = useSelector((s) => s.channels.onlineUsers)
  // const user = useSelector((s) => s.auth.user.username)
  const [channelsName, setChannelsName] = useState([])
  const [onlineUsersToggleState, setOnlineUsersToggleState] = useState(false)
  const [offlineUsersToggleState, setOfflineUsersToggleState] = useState(false)
  const [nameOfUsers, setNameOfUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])

  const isCreateChannelModalActive = useSelector(
    (s) => s.createChannelModal.isCreateChannelModalActive
  )

  useEffect(() => {
    setOnlineUsers(onlineUsersState)
  }, [onlineUsersState])

  // useEffect(() => {
  //   const handler = function (data) {
  //     console.log('дата получена', data)
  //     setOnlineUsers(data)
  //   }
  //   socket.on('Online users', handler)
  // }, [onlineUsers])

  useEffect(() => {
    setTimeout(() => {
      dispatch(userJoinToChat(activeChannel))
    }, 500)
  }, [])

  // useEffect(async () => {
  //   try {
  //     const socket = await getSocket()
  //     dispatch(userJoinToChat(activeChannel))
  //     console.log(socket)
  //   }
  //   catch (e) {
  //     console.log(e)
  //   }
  // }, [])




  const isSidebarToggleModalActive = useSelector((s) => s.toggle.isSidebarToggleModalActive)



  const addChannelModal = () => {
    dispatch(changeCreateChannelModalState())
  }

  function getChannelsData() {
    axios.get('/api/v1/channels').then(({ data }) => {
      dispatch(getChannelsInfo(JSON.stringify(data.channels)))
      if (channelsName.length === 0) {
        setChannelsName(data.channels.map((e) => e.channelName))
      }
    })
  }

  function getOfflineUsers() {
    axios.get('/api/v1/name-of-users').then(({ data }) => {
      setNameOfUsers(data)
    })
  }

  function changeOnlineUsersToggleState() {
    setOnlineUsersToggleState(!onlineUsersToggleState)
  }

  function changeOfflineUsersToggleState() {
    setOfflineUsersToggleState(!offlineUsersToggleState)
  }

  function updateActiveChannel(data) {
    dispatch(nullifyMessagesFromSocket())
    dispatch(updateActiveChannels(data))
  }

  function showSidebar() {
    dispatch(changeSidebarToggleState())
  }

  useEffect(() => {
    getChannelsData()
    getOfflineUsers()
  }, [])

  return (
    <CSSTransition
      in={isSidebarToggleModalActive}
      classNames="fade"
      timeout={500}
      // unmountOnExit
      appear="true"
    >
      <div
        className={
          isSidebarToggleModalActive
            ? 'w-full  sm:block sm:w-1/3 z-10 md:w-1/4 absolute  lg:w-1/5 xl:w-1/6'
            : 'hidden sm:block sm:w-1/3  z-10 md:w-1/4 absolute lg:w-1/5 xl:w-1/6'
        }
      >
        <div
          className={
            isCreateChannelModalActive
              ? 'bg-purple-900 text-purple-lighter   w-full absolute h-screen '
              : 'bg-purple-900 text-purple-lighter  w-full absolute h-screen'
          }
        >
          <div className="text-white  text-xl mb-6  pl-4 pr-3  font-sans flex justify-between">
            <span className="mt-2 font-mono">AlmostSlack</span>
            <button
              className="block sm:hidden focus:outline-none"
              type="button"
              onClick={showSidebar}
            >
              <p className=" text-gray-100 opacity-50 text-3xl transform rotate-45">+</p>
            </button>
            {/* <svg className="h-6 w-6 mt-4 text-purple-lightest fill-current" viewBox="0 0 32 32">
            <g id="surface1" className="ml-2">
              <path
                // style={''}
                d="M 16 3 C 14.894531 3 14 3.894531 14 5 C 14 5.085938 14.019531 5.167969 14.03125 5.25 C 10.574219 6.132813 8 9.273438 8 13 L 8 22 C 8 22.566406 7.566406 23 7 23 L 6 23 L 6 25 L 13.1875 25 C 13.074219 25.316406 13 25.648438 13 26 C 13 27.644531 14.355469 29 16 29 C 17.644531 29 19 27.644531 19 26 C 19 25.648438 18.925781 25.316406 18.8125 25 L 26 25 L 26 23 L 25 23 C 24.433594 23 24 22.566406 24 22 L 24 13.28125 C 24 9.523438 21.488281 6.171875 17.96875 5.25 C 17.980469 5.167969 18 5.085938 18 5 C 18 3.894531 17.105469 3 16 3 Z M 15.5625 7 C 15.707031 6.988281 15.851563 7 16 7 C 16.0625 7 16.125 7 16.1875 7 C 19.453125 7.097656 22 9.960938 22 13.28125 L 22 22 C 22 22.351563 22.074219 22.683594 22.1875 23 L 9.8125 23 C 9.925781 22.683594 10 22.351563 10 22 L 10 13 C 10 9.824219 12.445313 7.226563 15.5625 7 Z M 16 25 C 16.5625 25 17 25.4375 17 26 C 17 26.5625 16.5625 27 16 27 C 15.4375 27 15 26.5625 15 26 C 15 25.4375 15.4375 25 16 25 Z "
              />
            </g>
          </svg> */}
          </div>

          <div className="mb-6">
            <div className="opacity-50 flex px-4 -px-4 flex-row justify-between items-center">
              <div className="text-gray-100">Channels</div>
              <button className="focus:outline-none" type="button" onClick={addChannelModal}>
                <p className="text-gray-100 text-2xl">+</p>
              </button>
            </div>

              {channelsName.map((element) => (
                <div
                  key={element._id}
                  className={
                    activeChannel === element
                      ? 'bg-green-600 py-1 px-4 text-white font-semi-bold'
                      : 'py-1 px-4 text-white font-semi-bold'
                  }
                >
                  <Link
                    to={`/chat/${element}`}
                    className="flex flex-row transform hover:translate-x-2 transition-transform ease-in duration-200"
                    onClick={() => {
                      updateActiveChannel(element)
                      // showSidebar()
                    }}
                  >
                    <span className="mr-2 opacity-50 text-lg text-grey-100">#</span>
                    <span className="text-gray-100 break-all">{element}</span>
                  </Link>
                </div>
              ))}
          </div>

          <div className="px-4 ">
            <div className="opacity-50 mb-3 flex flex-row justify-between items-center">
              <div className="text-gray-100">Online users</div>
              <button
                className="focus:outline-none"
                type="button"
                onClick={changeOnlineUsersToggleState}
              >
                <p
                  className={
                    onlineUsersToggleState
                      ? 'text-gray-100 text-lg transform rotate-180 duration-200'
                      : 'text-gray-100 text-lg duration-200'
                  }
                >
                  △
                </p>
              </button>
            </div>

            <div className={onlineUsersToggleState ? 'block overflow-y-auto max-h-32' : 'hidden '}>
              {onlineUsers.map((element) => (
                <div key={element} className="flex items-center mb-3">
                  <span className="border bg-green-600 rounded-full block w-3 h-3 mr-2" />
                  <span className="text-white -mt-1">{element}</span>
                </div>
              ))}
              {/* <div className="flex items-center mb-3">
                <span className="border bg-green-600 rounded-full block w-3 h-3 mr-2" />
                <span className="text-white -mt-1">
                  {user.username} <i className="text-grey-100 text-sm opacity-50">(me)</i>
                </span>
              </div> */}
            </div>
          </div>

          <div className="px-4">
            <div className="opacity-50 mb-3 flex flex-row justify-between items-center">
              <div className="text-gray-100">Offline users</div>
              <button
                className="focus:outline-none"
                type="button"
                onClick={changeOfflineUsersToggleState}
              >
                <p
                  className={
                    offlineUsersToggleState
                      ? 'text-gray-100 text-lg transform rotate-180 duration-200'
                      : 'text-gray-100 text-lg duration-200'
                  }
                >
                  △
                </p>
              </button>
            </div>

            <div className={offlineUsersToggleState ? 'block overflow-y-auto max-h-32' : 'hidden'}>
              {nameOfUsers
                .filter((it) => onlineUsers.indexOf(it) === -1)
                .map((element) => (
                  <div key={element} className="flex items-center mb-3">
                    <span className="border opacity-50 bg-gray-100 rounded-full block w-3 h-3 mr-2" />
                    <span className="text-white -mt-1">{element}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* <div className="px-4 mb-3 text-gray-100 opacity-50">Offline users</div>

          <div className="flex items-center mb-4 px-4">
            <span className="border bg-gray-100 rounded-full block w-3 h-3 mr-2" />
            <span className="text-white">killgt</span>
          </div> */}
        </div>

        <CSSTransition
          in={isCreateChannelModalActive}
          classNames="alert"
          timeout={500}
          unmountOnExit
        >
          {isCreateChannelModalActive ? (
            <CreateChannelModal />
          ) : (
            <CreateChannelModal className="hidden" />
          )}
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}

Sidebar.propTypes = {}

export default Sidebar
