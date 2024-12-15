import React, { useEffect, useState, useCallback  } from 'react'
import { useAuthContext } from '../../../context/authContext'
import { Icon, Text, Box, Spinner, FormControl, Input, Flex, useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { getSender } from '../../../config/ChatLogics';
import { io } from 'socket.io-client';
import Lottie from 'react-lottie';
import axios from 'axios';
import animationData from '../../../animations/typing.json';
import ScrollableChat from './ScrollableChat';
import { useChatContext } from '../../../context/chatContext';
import { useQuery } from '@tanstack/react-query';

//axios.defaults.withCredentials= true;
const ENDPOINT = 'http://localhost:5000';
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    //const { authUser } = useAuthContext();
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const { selectedChat, setSelectedChat, messages, setMessages, newMessage, setNewMessage, notification, setNotification } = useChatContext();
    const toast = useToast();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };
    
    const fetchMessages = useCallback(async () => {
        if (!selectedChat) return;

        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            };
            const { data } = await axios.get(`/api/message/messages/${selectedChat._id}`,config);
            setMessages(data.messages);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error fetching the conversation",
                description: error.response?.data?.message || error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            setLoading(false);
        }
    }, [selectedChat, setMessages, toast]);

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                setNewMessage('');
                const { data } = await axios.post('/api/message/send', {
                    content: newMessage,
                    chatId: selectedChat._id,
                });
                socket.emit('send message', data.message);
                setMessages([...messages, data.message]);
            } catch (error) {
                toast({
                    title: "Error sending the message",
                    description: error.response?.data?.message || error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-left",
                });
            }
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", authUser);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, []);
    
    useEffect(() => {
    
        // Handle incoming messages
        socket.on('message received', (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                if(!notification.includes(newMessageReceived)){
                    setNotification([newMessageReceived,...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages( [...messages, newMessageReceived]);
            }
        });
    });

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat, fetchMessages]);

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;
        if (!typing){
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    }

    return (
        <>
        {selectedChat ? (
            <>
            <Text 
                className=' border-b border-divider-color'
                fontSize={{ base: "24px", md: "28px" }}
                pb={2}
                px={2}
                w="100%"
                display="flex"
                justifyContent={{ base: "space-between" }}
                alignItems="center"
                color="#6f4e37"
            >
                <Icon
                    as={FontAwesomeIcon}
                    icon={faArrowLeft}
                    display={{ base: "flex", md: "none" }}
                    w="20px"
                    h="20px"
                    ml={3}
                    mt={2}
                    color="#8b705d"
                    cursor='pointer'
                    onClick={() => setSelectedChat("")}
                    //className=' hidden max-[814px]:inline-block'
                />
                {selectedChat.isChatGroup ?  selectedChat.chatName.toUpperCase() : 
                    <>
                    {getSender(authUser, selectedChat.participents)}
                    <Icon
                        as={FontAwesomeIcon}
                        icon={faUser}
                        display="flex"
                        w="16px"
                        color="#6f4e37"
                        />
                    </>
                }
            </Text>
            <Box
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                mt={1}
                width="100%"
                height="100%"
                borderRadius="lg"
                overflowY="hidden"
                className='bg-btn-primary bg-opacity-30'
            >
                {loading ? (
                    <Spinner
                        size="xl"
                        w={20}
                        h={20}
                        alignSelf="center"
                        margin="auto"
                        color="#8b705d"
                    />
                ) : (
                    <div className='messages'>
                        <ScrollableChat />
                    </div>
                )}
                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                    <Box className='relative'>
                    {istyping ? 
                        <div>
                            <Lottie 
                                height={25}
                                width={60}
                                options={defaultOptions}
                                style={{ marginBottom: 10, marginLeft: 0 }}
                            /> 
                        </div> 
                        : <></>}
                        <Flex
                            as="label"
                            className='input h-11 max-[280px]:h-10 rounded-3xl input-bordered bg-transparent flex items-center gap-2 border-primary focus:border-primary hover:bg-transparent hover:border-primary'
                            alignItems="center"
                            position="relative"
                        >
                            <Input
                                placeholder="Enter a message.."
                                variant="unstyled"
                                flex="1"
                                width='2rem'
                                className='overflow-x-auto text-sm text-primary placeholder:text-btn-secondary placeholder:text-sm'
                                onChange={typingHandler}
                                value={newMessage}
                            />
                            <Icon
                                as={FontAwesomeIcon}
                                icon={faPaperPlane}
                                position="absolute"
                                right="1rem"
                                top="0.75rem"
                                w="4"
                                h="4"
                                color="#6f4e37"
                                cursor="pointer"
                            />
                        </Flex>
                    </Box>
                </FormControl>
            </Box>
            </>
        ): (
            <NoChatSelected />
        )}
        </>
    )
}

export default SingleChat

const NoChatSelected = () => {
    const {authUser} = useAuthContext();
    return (
        <div className='px-2 text-primary text-center sm:text-xl md:text-2xl font-semibold flex flex-col items-center gap-2'>
            <p>Welcome 👏 {authUser.fullName}</p>
            <span className='text-btn-secondary font-normal text-sm'>Select a chat to start messaging</span>
        </div>
    )
}