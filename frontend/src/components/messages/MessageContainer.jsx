import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// Cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='flex flex-col h-full md:min-w-[450px] border-l border-gray-200'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-gray-800 px-4 py-2 text-white flex items-center'>
						<span className='text-lg font-semibold'>To:</span>
						<span className='ml-2 text-lg font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full bg-gray-900'>
			<div className='text-center text-gray-300'>
				<p className='text-xl font-semibold mb-2'>Welcome, {authUser.fullName}!</p>
				<p className='mb-4'>Select a chat to start messaging</p>
				<TiMessages className='text-5xl' />
			</div>
		</div>
	);
};

export default MessageContainer;
