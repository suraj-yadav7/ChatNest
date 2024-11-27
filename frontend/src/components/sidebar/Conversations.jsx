import Conversation from "./conversation";
import useGetConversation from "../../hooks/useGetConversation";

const Conversations = () => {
    const {loading, conversations}  = useGetConversation()
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;