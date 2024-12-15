import React from 'react';
import ChatNav from '../../components/Chat/ChatNav/ChatNav';
import ChatPageBody from '../../components/Chat/ChatPageBody';

const Chat = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl p-1'>
                <ChatNav/>
                <ChatPageBody/>
            </div>
        </div>
    );
}

export default Chat;
