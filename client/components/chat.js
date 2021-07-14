import React from 'react'
import Sidebar from './chat/sidebar'
import MessagesWindow from './chat/messages-window'
import Head from './head'

const Chat = () => {
  return (
    <div className="h-screen">
      <Head title="Chat Almost Slack" />
      <Sidebar />
      <MessagesWindow />
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
