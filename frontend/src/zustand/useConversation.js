import {create} from "zustand"

const useConversation = create((set) => ({
    selectedConversation : null,
    setConversation : (selectedConversation)=> set({selectedConversation}),
    message : [],
    setMessage : (message) => set({message})
}))