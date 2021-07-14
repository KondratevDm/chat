import React from 'react'
import { useDispatch } from 'react-redux'
import { changeSidebarToggleState } from '../redux/reducers/toggle'

const Toggle = () => {
  const dispatch = useDispatch()

  function showSidebar() {
    dispatch(changeSidebarToggleState())
  }
  return (
    <div>
      <div className=" text-sm absolute -mt-4 sm:hidden text-gray-500">
        <button
          className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-purple-900 focus:text-purple-900 px-2 py-2"
          id="list"
          type="button"
          onClick={showSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-current w-7 h-7 mr-2"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

Toggle.propTypes = {}

export default React.memo(Toggle)
