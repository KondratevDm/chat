import React from 'react'
// import { useSelector } from 'react-redux'
import Sidebar from './chat/sidebar'
import MessagesWindow from './chat/messages-window'
import Head from './head'
// import CreateChannelModal from './create-channel-modal'

const Chat = () => {
  // const isCreateChannelModalActive = useSelector(
  //   (s) => s.createChannelModal.isCreateChannelModalActive
  // )

  return (
    <div className="h-screen">
      {/* <div className={isCreateChannelModalActive ? 'h-screen opacity-50' : 'h-screen'}> */}
        <Head title="Chat" />
        <Sidebar />
        <MessagesWindow />
        {/* {isCreateChannelModalActive ? <CreateChannelModal  /> : null} */}
      {/* </div> */}
      {/* <div className="inline-block"> */}

      {/* </div> */}
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
