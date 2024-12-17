import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL

const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])

    const getConversation = async()=>{
        setLoading(true)
        const jwttoken = sessionStorage.getItem("jwttoken")
        try{
            let response  = await axios.get(`${base_url}/api/user/all`, {
                headers:{
                    Authorization: token? `Bearer ${jwttoken}`:''
                }
            })
            if(response.status){
                setConversation(response.data.data)
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
    return {loading, conversation}
};

export default useGetConversation;