import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])

    const getConversation = async()=>{
        setLoading(true)
        try{
            let response  = await axios.get("/api/user")
            if(response.status){
                setConversation(response.data.data)
                toast.success(response.data.message)
            }
        }
        catch(error){
            console.log("Error occur while getting conversation: ", error)
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getConversation()
    },[])
    return {loading, conversation}
};

export default useGetConversation;