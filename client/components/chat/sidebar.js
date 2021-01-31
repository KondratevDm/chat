import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import CreateChannelModal from '../create-channel-modal'
import { changeCreateChannelModalState } from '../../redux/reducers/createChannelModal'
import { getChannelsInfo } from '../../redux/reducers/channels'

const Sidebar = () => {
  // const сhannels = useSelector((s) => s.channels.channels)
  const [channelsName, setChannelsName] = useState([])
  const isCreateChannelModalActive = useSelector(
    (s) => s.createChannelModal.isCreateChannelModalActive
  )

  const dispatch = useDispatch()

  const addChannelModal = () => {
    dispatch(changeCreateChannelModalState())
  }

  function getChannelsName() {
    axios.get('/api/v1/channels').then(({ data }) => {
      dispatch(getChannelsInfo(JSON.stringify(data.channels)))
      setChannelsName(data.channels.map((e) => e.channelName))
    })
  }

  useEffect(() => {
    getChannelsName()
  }, [])

  // useEffect(() => {
  //   setChannelsName(сhannels.map((e) => e.channelName))
  // }, [сhannels])

  return (
    <div>
      <div
        className={
          isCreateChannelModalActive
            ? 'bg-purple-900 text-purple-lighter w-1/6 h-screen  hidden md:block absolute opacity-50'
            : 'bg-purple-900 text-purple-lighter w-1/6 h-screen  hidden md:block absolute'
        }
      >
        <h1 className="text-white text-xl mb-2  px-4 font-sans flex justify-between">
          <span className="mt-2">Tailwind CSS</span>
          <svg className="h-6 w-6 mt-4 text-purple-lightest fill-current" viewBox="0 0 32 32">
            <g id="surface1">
              <path
                // style={''}
                d="M 16 3 C 14.894531 3 14 3.894531 14 5 C 14 5.085938 14.019531 5.167969 14.03125 5.25 C 10.574219 6.132813 8 9.273438 8 13 L 8 22 C 8 22.566406 7.566406 23 7 23 L 6 23 L 6 25 L 13.1875 25 C 13.074219 25.316406 13 25.648438 13 26 C 13 27.644531 14.355469 29 16 29 C 17.644531 29 19 27.644531 19 26 C 19 25.648438 18.925781 25.316406 18.8125 25 L 26 25 L 26 23 L 25 23 C 24.433594 23 24 22.566406 24 22 L 24 13.28125 C 24 9.523438 21.488281 6.171875 17.96875 5.25 C 17.980469 5.167969 18 5.085938 18 5 C 18 3.894531 17.105469 3 16 3 Z M 15.5625 7 C 15.707031 6.988281 15.851563 7 16 7 C 16.0625 7 16.125 7 16.1875 7 C 19.453125 7.097656 22 9.960938 22 13.28125 L 22 22 C 22 22.351563 22.074219 22.683594 22.1875 23 L 9.8125 23 C 9.925781 22.683594 10 22.351563 10 22 L 10 13 C 10 9.824219 12.445313 7.226563 15.5625 7 Z M 16 25 C 16.5625 25 17 25.4375 17 26 C 17 26.5625 16.5625 27 16 27 C 15.4375 27 15 26.5625 15 26 C 15 25.4375 15.4375 25 16 25 Z "
              />
            </g>
          </svg>
        </h1>

        <div className="flex items-center -mt-1 mb-6 px-4">
          <span className="border bg-green-600 rounded-full block w-3 h-3 mr-2" />
          <span className="text-white">Olivia</span>
        </div>

        <div className="mb-6">
          <div className="opacity-50 flex px-4 -px-4 flex-row justify-between items-center">
            <div className="text-gray-100">Channels</div>
            <button className="focus:outline-none" type="button" onClick={addChannelModal}>
              <p className="text-gray-100 text-2xl">+</p>
            </button>
          </div>

          {channelsName.map((element) => (
            <div key={element._id} className="py-1 px-4 text-white font-semi-bold">
              <Link
                to={`/chat/${element}`}
                className="flex flex-row transform hover:translate-x-2 transition-transform ease-in duration-200"
              >
                <span className="mr-2 opacity-50 text-lg text-grey-100">#</span>
                <span className="text-gray-100">{element}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* <div className="bg-green-600 mb-6 py-1 px-4 text-white font-semi-bold">
          <span className="pr-1 text-grey-light">general</span>
        </div> */}

        <div className="px-4 mb-3 text-gray-100 opacity-50">Direct Messages</div>

        <div className="flex items-center mb-3 px-4">
          <span className="border bg-green-600 rounded-full block w-3 h-3 mr-2" />
          <span className="text-white">
            Olivia Dunham <i className="text-grey-100 text-sm opacity-50">(me)</i>
          </span>
        </div>

        <div className="flex items-center mb-3 px-4">
          <span className="border bg-green-600 rounded-full block w-3 h-3 mr-2" />
          <span className="text-white">Adam Bishop</span>
        </div>

        <div className="flex items-center mb-4 px-4">
          <span className="border bg-grey-100 rounded-full block w-3 h-3 mr-2" />
          <span className="text-white">killgt</span>
        </div>

        <div className="px-4 mb-3 font-sans text-gray-100 opacity-50">Applications</div>
      </div>
      {isCreateChannelModalActive ? <CreateChannelModal /> : null}
    </div>
  )
}

Sidebar.propTypes = {}

export default Sidebar
