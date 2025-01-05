import { useState } from "react";
import { useConversation } from "../../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
const base_url = import.meta.env.VITE_BASE_URL

const Conversation = ({ conversation,lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation()
	const isSelected = selectedConversation?._id === conversation._id;

	const jwttoken = sessionStorage.getItem("jwttoken")
	const getFriendConvers= async(conversation)=>{
		try{
			const response = await axios.get(`${base_url}/api/message/get/${conversation._id}`,{
				headers:{
					Authorization: jwttoken? `Bearer ${jwttoken}`:""
				}
			})
			if(response.data.status){
				toast.success(response.data.message)
			}
			setSelectedConversation(response.data.data)
		}catch(error){
			console.log("Error while fetching conversations: ", error)
		}
	};

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => getFriendConvers(conversation)}
			>
				<div className="avatar online">
					<div className='w-12 rounded-full'>
						<img src={conversation.profile} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullname}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>
			{!lastIdx && <div className="divider my-0 py-0 h-1" />}
		</>
	);
};
export default Conversation;