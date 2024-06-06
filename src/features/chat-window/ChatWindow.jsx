import React, { useState } from 'react'
import MessageWindow from '../message-window/MessageWindow'
import InputArea from '../input-area/InputArea'

function ChatWindow() {

  return (
    <div className='bg-slate-500 h-5/6 w-4/6 rounded-lg flex flex-col gap-4 p-8 items-center'>
        <MessageWindow/>
        <InputArea/>
    </div>
  )
}

export default ChatWindow