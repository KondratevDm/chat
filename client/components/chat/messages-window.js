import React from 'react'

const MessagesWindow = () => {
  return (
    <div className="w-5/6 ml-auto pt-0 h-full">
      <div className="w-full flex flex-col my-auto h-full">
        {/* <!-- Top bar --> */}
        <div className="border-b flex px-6 items-center">
          <div className="flex flex-col">
            <h3 className=" mt-2 text-xl mb-1 font-bold"> #general</h3>
            <div className="text-black opacity-75 font-light text-sm">
              Chit-chattin` about ugly HTML and mixing of concerns.
            </div>
          </div>
        </div>

        {/* <!-- Chat messages --> */}
        <div className="px-6 py-4 flex-1 overflow-scroll-x overflow-y-auto flex-grow flex flex-col">
          {/* <!-- A message --> */}
          <div className="flex items-start mb-4">
            <img
              src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4"
              className="w-10 h-10 rounded mr-3 mt-1"
              alt="profile-pic"
            />
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="font-bold mr-2 font-sans">killgt</span>
                <span className="text-black text-sm opacity-50 font-light">11:46</span>
              </div>
              <p className="font-light text-gray-900">The slack from the other side.</p>
            </div>
          </div>
          {/* <!-- A message --> */}
          <div className="flex items-start mb-4">
            <img
              src="https://i.imgur.com/8Km9tLL.jpg"
              className="w-10 h-10 rounded mr-3 mt-1"
              alt="profile-pic"
            />
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="font-bold mr-2 font-sans">Olivia Dunham</span>
                <span className="text-black text-sm opacity-50 font-light">12:45</span>
              </div>
              <p className="font-light text-gray-900">
                {' '}
                How are we supposed to control the marquee space without an utility for it? I
                propose this.
              </p>
            </div>
          </div>

          {/* <!-- A message --> */}
          <div className="flex items-start mb-4">
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
              <p className="font-light text-gray-900">
                {' '}
                the size of the generated CSS is creating a singularity in space/time, we must stop
                adding more utilities before it`s too late!
              </p>
            </div>
          </div>



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

        <div className="flex ml-6 mr-6 mt-18  overflow-hidden">
          <input
            type="text"
            placeholder="Message to #general"
            className="w-full mt-2  mb-6 px-6 py-2 border-gray-700 border rounded-l-lg text-gray-900 font-light focus:outline-none"
          />

          <div className="mt-2">
            <button
              type="button"
              className="bg-white text-gray-900 border-gray-700 font-light rounded-r-lg border hover:border-green-600 hover:bg-green-500 focus:outline-none hover:text-white py-2 px-6 inline-flex items-center"
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
