import React, { useEffect, useState } from "react";
import { useToast } from '@chakra-ui/react';
import { useAuthContext } from '../../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ChatLoading from '../ChatLoading';
import Chat from './Chat';
import axios from "axios";
import { useChatContext } from "../../../context/chatContext";
import { useQuery } from "@tanstack/react-query";

const ChatPageSideBar = ({ fetchAgain }) => {
    const { selectedChat, setSelectedChat, chats, setChats } = useChatContext();
    //const { authUser } = useAuthContext();
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const [loggedUser, setLoggedUser] = useState();
    const toast = useToast();

    const fetchChats = async () => {
        try {
            const { data } = await axios.get("/api/chats");
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(authUser);
        fetchChats();
    }, [fetchAgain]);

    return (
        <div className={`chatSideBar ${selectedChat ? 'hidden' : 'block'} h-full w-full min-[815px]:block min-[815px]:w-1/4 bg-background`}>
            <div className="relative flex mb-2 mx-5 py-3 px-1 border-b border-divider-color">
                <h1 className="text-xl font-bold text-primary">My chats</h1>
                <div className="absolute right-0 pt-1 cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} className="text-primary" />
                </div>
            </div>
            <div className='container1 w-full'>
                <div className='h-full overflow-y-auto'>
                    {chats ? (
                        <div className='flex flex-col overflow-auto'>
                            {chats.map((chat) => (
                                <Chat
                                    key={chat._id}
                                    chat={chat}
                                    loggedUser={loggedUser}
                                    handleFunction={() => setSelectedChat(chat)}
                                />
                            ))}
                        </div>
                    ) : (
                        <ChatLoading />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPageSideBar;
