import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { extractTime, isLastMessage, isReceiver, isSameSender, isSameSenderMargin } from '../../../config/ChatLogics';
import { useAuthContext } from '../../../context/authContext';
import { Tooltip, Avatar } from '@chakra-ui/react';
import { useChatContext } from '../../../context/chatContext';
import { useQuery } from '@tanstack/react-query';

const ScrollableChat = () => {
    //const { authUser } = useAuthContext();
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const { messages } = useChatContext();
    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => (
                <div className='flex' key={m._id}>
                    {(isSameSender(messages, m, i, authUser._id) || isLastMessage(messages, i, authUser._id)) && (
                        <Tooltip
                            key={`tooltip-avatar-${m._id}`}
                            label={m.sender?.username}
                            placement='bottom-start'
                            background="#e2d0bb"
                            borderRadius="2xl"
                            color="#6F4E37"
                            fontSize="14px"
                            p={1}
                            px={2}
                            hasArrow
                        >
                            <Avatar
                                mt='7px'
                                size='sm'
                                src={m.sender?.avatar || 'https://avatar.iran.liara.run/public'}
                                cursor='pointer'
                                name={m.sender?.username}
                            />
                        </Tooltip>
                    )}
                    <Tooltip
                        key={`tooltip-content-${m._id}`}
                        label={extractTime(m.createdAt)}
                        placement={`${m.sender?._id === authUser._id ? 'bottom-start' : 'bottom-end'}`}
                        background={`${m.sender?._id === authUser._id ? '#e4d4c1' : '#f6d7d3'}`}
                        borderRadius="2xl"
                        color="#6F4E37"
                        fontSize="12px"
                        p={1}
                        px={2}
                        hasArrow
                    >
                        <span
                            key={`content-${m._id}`}
                            className={`bg-opacity-30 text-primary text-xs ${m.sender?._id === authUser._id ? 'bg-btn-secondary' : 'bg-red-300'} 
                                        py-2 px-3 rounded-3xl max-w-[75%] my-[1px]
                                        ${isReceiver(messages, m, i, authUser._id) ? 'ml-9' : 'ml-1'} ${isSameSenderMargin(messages, m, i, authUser._id) ? 'ml-auto mr-1' : ''}`}
                        >
                            {m.content}
                        </span>
                    </Tooltip>
                </div>
            ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;
