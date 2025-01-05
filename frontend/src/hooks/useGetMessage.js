import { useEffect, useState } from "react"
import { useConversation } from "../zustand/useConversation"
import toast from "react-hot-toast"
import axios from "axios";

const useGetMessage = () =>{
    const [loading, setLoading]  = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    const getMessage = async() =>{
        setLoading(true)
        try{
            const response = await axios.get(`${base_url}/api/message/get/id=${user}`, {
                headers:{
                    Authorization: jwttoken? `Bearer ${jwttoken}`:''
                }
            })
            if(result.error) throw new Error(result.error)
            setMessages(result.data)
        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
    if(selectedConversation?._id) getMessage()
    },[selectedConversation?._id, setMessages])

    return {loading, messages}
};
export default useGetMessage;