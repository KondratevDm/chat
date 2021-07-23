import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { CSSTransition } from 'react-transition-group'
import CreateChannelModal from '../create-channel-modal'
import { changeCreateChannelModalState } from '../../redux/reducers/createChannelModal'
import { getChannelsInfo, updateActiveChannels, userJoinToChat } from '../../redux/reducers/channels'
import { nullifyMessagesFromSocket } from '../../redux/reducers/message'
import { changeSidebarToggleState } from '../../redux/reducers/toggle'
import '../../../style.css'

const Sidebar = () => {
  const dispatch = useDispatch()
  const activeChannel = useSelector((s) => s.channels.activeChannel)
  const onlineUsersState = useSelector((s) => s.channels.onlineUsers)
  const isSidebarToggleModalActive = useSelector((s) => s.toggle.isSidebarToggleModalActive)
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


  useEffect(() => {
    setTimeout(() => {
      dispatch(userJoinToChat(activeChannel))
    }, 500)
  }, [])

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
