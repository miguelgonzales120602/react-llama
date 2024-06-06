import React, {useRef, useState, useEffect} from 'react'
import useStore from '../../../store/useStore'
import axios from 'axios'

function PromptInput() {
    const {setMessages} = useStore()
    const [isLoading, setIsLoading] = useState(false)
    const textAreaRef = useRef(null)

    const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN
    const API_URL = import.meta.env.VITE_API_URL

    async function query(data){
        try{
            setIsLoading(true)
            const response = await axios.post(
                API_URL,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`
                    }
                }
            )
            setIsLoading(false)
            return response.data
        }
        catch(error){
            setIsLoading(false)
            console.error("Error occurred in accessing API: ", error)
        }
    }

    async function generateRespnose(prompt){
        try{
            const response = await query({"inputs": prompt})
            const res = response[0].generated_text
            return res
        }
        catch(error){
            console.error("Error has occurred in generating response: ", error)
            return null
        }
    }

    const handlePrompt = async (prompt) => {
        setMessages(prompt, 'prompt')
        const res = await generateRespnose(prompt)
        console.log(res)
        setMessages(res, 'response')
    }

    const handleInput = () => {
        const textArea = textAreaRef.current
        const previousHeight = textArea.scrollHeight

        textArea.style.height = 'auto'
        const newHeight = textArea.scrollHeight
        textArea.style.height = `${newHeight}px`

        const heightDifference = newHeight - previousHeight
        textArea.style.bottom = `=${heightDifference}px`

        if(textArea.scrollHeight > textArea.clientHeight)
            textArea.style.overflowY = 'auto'
        else
            textArea.style.overflowY = 'hidden'
    }
    
    useEffect(() => {
        const textArea = textAreaRef.current
        textArea.style.height = `${textArea.scrollHeight}px`

        if(textArea.scrollHeight > textArea.clientHeight)
            textArea.style.overflowY = 'auto'
        else
            textArea.style.overflowY = 'hidden'
    }, [])

    const inputText = (e) => {
        const textArea = e.currentTarget
        if(e.key === 'Enter' && !e.shiftKey && textAreaRef.current === document.activeElement){
            e.preventDefault()
            handlePrompt(e.target.value)
            textArea.value = ''
            textArea.style.height = 'auto'
        }
    }
    
    return(
        <div className='relative w-full h-fit max-h-48'>
            <textarea 
                name="promptArea"
                id="prompt-area"
                ref={textAreaRef}
                className='auto-resize-textarea p-2 w-full h-fit max-h-48 bg-white no-scrollbar'
                onInput={handleInput}
                onKeyDown={(e) => {inputText(e)}}
                placeholder='Enter a prompt... (Press Enter to submit)'
                style={{resize: 'none', position: 'absolute', bottom: 0}}
            ></textarea>
            {isLoading && <div className='absolute bottom-0 right-0 mr-2 mb-2'>Loading...</div>}
        </div>
    )
}

export default PromptInput