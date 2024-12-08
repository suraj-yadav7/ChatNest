import { useState } from "react"
import { useConversation } from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = ()=>{
    const [loading, setLoading]  = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    const sendMessage = async({message}) => {
        try{
            setLoading(true)
            const response = await fetch(`/api/message/send/${selectedConversation._id}`, {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({message})
            })
            const result = response.json()
            if(result.status){
                toast.success(result.message)
                setMessages([...messages, result.message])
            }

        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return {sendMessage, loading}
};
export default useSendMessage;