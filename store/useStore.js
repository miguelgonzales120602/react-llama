import { create } from 'zustand'

const useStore = create((set) => ({
  messages: [],
  inc: () => set((state) => ({ count: state.count + 1 })),
  setMessages: (message, sender) => {
    const newMessage = {message, sender}
    set(state => {return {messages: [...state.messages, newMessage]}})
}
}))


export default useStore