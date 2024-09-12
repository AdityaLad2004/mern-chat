import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const endOfMessagesRef = useRef(null);

	useEffect(() => {
		// Smooth scroll to the bottom when new messages arrive
		if (endOfMessagesRef.current) {
			endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{loading ? (
				// Display loading skeletons while fetching messages
				<div className='space-y-2'>
					{[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
				</div>
			) : messages.length > 0 ? (
				// Display messages
				<>
					{messages.map((message) => (
						<Message key={message._id} message={message} />
					))}
					{/* Reference element to scroll into view */}
					<div ref={endOfMessagesRef} />
				</>
			) : (
				// Display a message when there are no messages
				<p className='text-center text-gray-500'>Send a message to start the conversation</p>
			)}
		</div>
	);
};

export default Messages;
