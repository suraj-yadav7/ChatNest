import {create} from "zustand"

export const useConversation = create((set) => ({
    selectedConversation : null,
    setSelectedConversation : (conversation)=> set({selectedConversation:conversation}),
    messages : [],
    setMessages : (message) => set({messages:message})
}))