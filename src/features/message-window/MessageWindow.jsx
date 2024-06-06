import React from 'react'
import useStore from '../../../store/useStore'
import ChatMessage from '../chat/ChatMessage'

function MessageWindow() {
  const {messages} = useStore()

  return (
    <div className='bg-slate-700 w-full h-full rounded-lg p-4 flex flex-col gap-8 overflow-y-scroll no-scrollbar'>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.message} sender={message.sender}/>
        ))}
    </div>
  )
}

export default MessageWindow