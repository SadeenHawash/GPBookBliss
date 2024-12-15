import React from 'react';
import { Box } from '@chakra-ui/react';
import { useAuthContext } from '../../../context/authContext';
import SingleChat from './SingleChat';
import { useChatContext } from '../../../context/chatContext';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = useChatContext();

    return (
        <Box 
            display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
            alignItems="center"
            flexDir="column"
            p={3}
            flex="flex"
            w={{ base: "100%", md: "75%" }}
            borderRadius="lg"
            borderWidth="1px"
            className='chatBody bg-background container max-[950px]:hidden flex flex-col justify-center w-full'
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};

export default ChatBox;
