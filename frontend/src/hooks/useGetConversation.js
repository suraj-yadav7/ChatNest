import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL

const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([]);

    const getConversation = async()=>{
        setLoading(true)
        const jwttoken = sessionStorage.getItem("jwttoken")
        if(!jwttoken){
            console.log("Need jwt token.")
            return false
        }
        try{
            let response  = await axios.get(`${base_url}/api/user/all`, {
                headers:{
                    Authorization: jwttoken? `Bearer ${jwttoken}`:''
                }
            })
            console.log("response: ", response)
            if(response.status){
                setConversations(response.data.data)
                toast.success(response.data.message)
            }
        }
        catch(error){
            console.log("Error occur while getting conversation: ", error)
            toast.error(error?.response.data.message)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getConversation()
    },[])
    return {loading, conversations}
};

export default useGetConversation;