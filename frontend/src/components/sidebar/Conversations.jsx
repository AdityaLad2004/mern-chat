import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.length > 0 ? (
				conversations.map((conversation, idx) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						emoji={getRandomEmoji()}
						lastIdx={idx === conversations.length - 1}
					/>
				))
			) : (
				<p className='text-center text-gray-500'>No conversations available</p>
			)}

			{loading && <div className='flex justify-center py-4'><span className='loading loading-spinner'></span></div>}
		</div>
	);
};

export default Conversations;
