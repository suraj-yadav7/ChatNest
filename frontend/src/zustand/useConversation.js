import {create} from "zustand"

export const useConversation = create((set) => ({
    selectedConversation : null,
    setSelectedConversation : (conversations)=> set({selectedConversation:conversations}),
    messages : [],
    setMessages : (message) => set({messages:message})
}))