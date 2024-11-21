import { useState } from "react";

const Conversation = ({ conversation }) => {
	const [ selectedConversation, setSelectedConversation ] = useState();

	const isSelected = selectedConversation?._id === conversation._id;
	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>EMOJI</span>
					</div>
				</div>
			</div>
		</>
	);
};
export default Conversation;