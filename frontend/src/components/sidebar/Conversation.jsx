import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	const isSelected = selectedConversation?._id === conversation._id;

	return (
		<>
			<div
				className={`flex gap-3 items-center p-3 rounded cursor-pointer transition-colors
				${isSelected ? "bg-sky-600 text-white" : "hover:bg-sky-500"}
				`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`relative`}>
					<div className={`w-12 h-12 rounded-full overflow-hidden ${isOnline ? "ring-2 ring-green-400" : ""}`}>
						<img src={conversation.profilePic} alt='user avatar' className='w-full h-full object-cover' />
					</div>
					{isOnline && (
						<div className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white' />
					)}
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex justify-between items-center'>
						<p className='font-semibold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='border-t my-2' />}
		</>
	);
};

export default Conversation;
