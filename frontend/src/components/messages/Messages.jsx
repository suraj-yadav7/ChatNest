import Message from "./Message";
import useGetMessage from "../../hooks/useGetMessage";

const Messages = () => {
	const { messages, loading } = useGetMessage();

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
		</div>
	);
};
export default Messages;