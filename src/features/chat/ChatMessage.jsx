import React from 'react'

function ChatMessage({message, sender}) {
    if(sender == 'prompt'){
        return(
            <div className='w-full flex flex-row-reverse'>
                <div className='p-2 bg-blue-500 text-white rounded-2xl font-sans break-words max-w-4xl'>
                    {message}
                </div>
            </div>
        )
    }

    else{
        return(
            <div className='w-full flex flex-row'>
                <div className='p-2 bg-white text-black rounded-2xl font-sans break-words max-w-4xl'>
                    {message}
                </div>
            </div>
        )
    }
}

export default ChatMessage