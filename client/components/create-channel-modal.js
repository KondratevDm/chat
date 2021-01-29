import React, {} from 'react'
import { useDispatch } from 'react-redux'
import {
  changeCreateChannelModalState,
  createChannelName,
  createChannelDescription,
  createChannel
} from '../redux/reducers/createChannelModal'

const CreateChannelModal = () => {
  const dispatch = useDispatch()

  const removeChannelModal = () => {
    dispatch(changeCreateChannelModalState())
  }

  return (
    <div className="opacity-150">
      <div className="h-screen w-5/6 left-1/6 absolute z-10 flex justify-center items-center">
        <div className="shadow w-full md:w-1/4 border-solid border-2  rounded-md border-purple-900 px-6 pt-2 pb-6 my-2">
          <div className="flex mb-2 flex-row justify-between items-center">
            <div className="text-gray-800 text-lg">Create a channel</div>
            <button className="focus:outline-none" type="button" onClick={removeChannelModal}>
              <p className="text-gray-800 text-3xl transform rotate-45">+</p>
            </button>
          </div>
          <div className="flex flex-wrap mb-2">
            <div className="relative w-full appearance-none label-floating">
              <div className="text-sm text-gray-700 mb-2">Channel name:</div>
              <input
                className="tracking-wide focus:outline-none py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="#new-channel"
                autoComplete="off"
                onChange={(e) => {
                  dispatch(createChannelName(e.target.value))
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap mb-2">
            <div className="relative w-full appearance-none label-floating">
              <div className="text-sm text-gray-700 mb-2">Description of a channel:</div>
              <input
                className="tracking-wide focus:outline-none py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="#new-channel-description"
                autoComplete="off"
                onChange={(e) => {
                  dispatch(createChannelDescription(e.target.value))
                }}
              />
            </div>
          </div>

          <button
            type="button"
            className="hover:bg-green-600 uppercase bg-purple-900 text-white px-3 py-2 rounded w-full"
            onClick={() => {
              dispatch(createChannel())
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

CreateChannelModal.propTypes = {}

export default React.memo(CreateChannelModal)
