import React from 'react'
import Sidebar from './chat/sidebar'
import MessagesWindow from './chat/messages-window'
import Head from './head'

const Chat = () => {
  return (
    <div className="h-screen">
      <div className="h-screen">
        <Head title="Chat" />
        <Sidebar />,
        <MessagesWindow />,
      </div>
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
