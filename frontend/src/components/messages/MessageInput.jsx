import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return; // Prevent sending empty messages
		await sendMessage(message);
		setMessage(""); // Clear the input field after sending
	};

	return (
		<form className='px-4 py-2 border-t border-gray-700' onSubmit={handleSubmit}>
			<div className='relative flex items-center'>
				<input
					type='text'
					className='w-full p-2.5 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Type a message...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type='submit'
					className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500'
					disabled={loading}
				>
					{loading ? (
						<div className='w-5 h-5 border-2 border-blue-500 border-t-transparent border-solid rounded-full animate-spin'></div>
					) : (
						<BsSend size={20} />
					)}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
