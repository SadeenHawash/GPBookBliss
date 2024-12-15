import React from 'react'
import { extractTime, getSender } from '../../../config/ChatLogics';
import { useChatContext } from '../../../context/chatContext';

export default function Chat ({chat, loggedUser, handleFunction}) {
    // src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
    const { selectedChat } = useChatContext();
    return (
        <div onClick={handleFunction} className={`cursor-pointer mx-4 rounded-md bg-btn-secondary bg-opacity-0 ${selectedChat === chat ? 'bg-opacity-40' : '' }`}>
            <div className='relative flex items-center gap-4 max-[280px]:gap-3 border-b border-divider-color py-2 sm:px-3 
                            hover:bg-secondary hover:bg-opacity-30'>
                <div className='avatar online z-0'>
                    <div className='w-9 max-[280px]:w-8 rounded-full ring-2 ring-primary'>
                        <img src='https://avatar.iran.liara.run/public'
                        alt='user avatar' />
                    </div>
                </div>
                <div className='flex-col sm:inline-block'>
                    <div className='font-bold text-sm text-primary min-[815px]:text-[13px]'>
                        {chat.isChatGroup ?  chat.chatName : getSender(loggedUser, chat.participents)}
                    </div>
                    {chat.latestMessage && (
                        <div className='flex pt-1 gap-5 text-btn-secondary'>
                            <span className='text-[11px] ellipsis'>
                            {chat.isChatGroup ? `${chat.latestMessage.sender.username}: ${chat.latestMessage.content}` :
                                chat.latestMessage.content
                            }
                            </span>
                            <span className='absolute right-2 text-[11px]'> {extractTime(chat.latestMessage.createdAt)}</span> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
