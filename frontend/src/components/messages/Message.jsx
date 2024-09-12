import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBorderColor = fromMe ? "border-blue-600" : "border-gray-300";
    const chatAlignment = fromMe ? "text-right" : "text-left";
    const chatBackgroundColor = fromMe ? "bg-blue-600" : "bg-gray-200";
    const bubbleSize = fromMe ? "max-w-xs" : "max-w-sm";
    const shakeClass = message.shouldShake ? "animate-shake" : "";

    return (
        <div className={`flex items-start ${chatAlignment} mb-4`}>
            {!fromMe && (
                <div className='w-10 h-10 rounded-full overflow-hidden mr-2'>
                    <img alt='Profile' src={profilePic} className='object-cover w-full h-full' />
                </div>
            )}
            <div className={`relative ${fromMe ? "ml-auto" : "mr-auto"} ${bubbleSize}`}>
                <div className={`py-2 px-4 rounded-lg ${chatBackgroundColor} border ${bubbleBorderColor} border-2 ${shakeClass}`}>
                    <p className='text-sm text-white'>{message.message}</p>
                </div>
                <div className='absolute bottom-0 right-0 text-xs text-gray-500'>
                    {formattedTime}
                </div>
            </div>
            {fromMe && (
                <div className='w-10 h-10 rounded-full overflow-hidden ml-2'>
                    <img alt='Profile' src={profilePic} className='object-cover w-full h-full' />
                </div>
            )}
        </div>
    );
};

export default Message;
