import React from 'react'
import Sidebar from './chat/sidebar'
import MessagesWindow from './chat/messages-window'
// import WelcomeWindow from './welcome-window'
import Head from './head'

const Chat = () => {
  return (
    <div className="h-screen">
      <Head title="Chat" />
      <Sidebar />
      <MessagesWindow />
      {/* <WelcomeWindow /> */}
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
