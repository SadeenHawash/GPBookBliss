import React, { useState } from 'react';
import ChatPageSideBar from './SideBar/ChatPageSideBar';
import ChatBox from './ChatBox/ChatBox';

const ChatPageBody = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div className='h-screen mt-1 max-w-7xl p-1 max-[280px]:p-0 rounded-xl overflow-hidden flex justify-center'>
            <div className='flex-1 flex gap-2'>
                <ChatPageSideBar fetchAgain={fetchAgain} />
                <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </div>
        </div>
    );
};

export default ChatPageBody;
