import React, { Fragment, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faClose, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../context/authContext'
import { Box, Flex, Image, Menu, MenuButton, MenuList, MenuItem, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Input, Spinner, useToast, Icon } from "@chakra-ui/react";
import ChatLoading from '../ChatLoading';
import ResultSearchChat from './SearchChat/ResultSearchChat';
import { useChatContext } from "../../../context/chatContext";
import { getSenderForNotification } from "../../../config/ChatLogics";
import { useQuery } from "@tanstack/react-query";

const ChatNav = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    //const { authUser } = useAuthContext();
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const { setSelectedChat, chats, setChats, notification, setNotification } = useChatContext();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.get(`/api/chats/search-chat?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error occurred!",
                description: "Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const accessChat = async (userId) => {
        console.log(userId);
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post('/api/chats/acess-chat', { userId }, config);
            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats]);
                console.log('new chat ');
            }
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            console.error('Error fetching the chat:', error.response ? error.response.data : error.message);
            toast({
                title: "Error fetching the chat",
                description: error.response?.data?.message || error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setLoadingChat(false);
        }
    };

    const links = (
        <Fragment>
            <Menu>
                <MenuButton as={Box} cursor='pointer' position='relative' mr={4} mt={2}>
                    <FontAwesomeIcon icon={faBell} className="h-[19px] w-[19px] flex-shrink-0 text-primary group-hover:text-primary" aria-hidden="true" />
                    { notification.length > 0 && <span className="absolute -top-1 mb-5 text-xs text-primary group-hover:text-primary">{notification.length}</span> }
                </MenuButton>
                <MenuList
                    zIndex={10} p={2} boxShadow="lg" rounded="lg"
                    textColor="#6f4e37"
                    background="#f4ede6"
                    borderColor="transparent"
                    className="flex flex-col justify-center items-center text-sm"
                >
                {!notification.length && "No New Messages"}
                {notification.map(notif => {
                    //console.log('Notification:', notif);
                    const senderName = notif.chat.isChatGroup 
                        ? `New Message in ${notif.chat.chatName}` 
                        : `New Message From ${getSenderForNotification(authUser, notif.chat.participents)}`;
                    //console.log('Sender Name:', senderName);
                    return (
                        <MenuItem
                            background="transparent" fontSize="14px" className='pb-1 mb-1 border-b border-divider-color'
                            key={notif._id}
                            onClick={() => {
                                setSelectedChat(notif.chat);
                                setNotification(notification.filter((n) => n !== notif));
                            }}
                        >
                            {senderName}
                        </MenuItem>
                    );
                })}
                </MenuList>
            </Menu>
            <Link to="#">
                <Image
                    tabIndex={0}
                    role="button"
                    boxSize="2.2rem"
                    borderRadius="full"
                    src="https://avatar.iran.liara.run/public"
                    alt="Profile"
                    ml={1}
                    mt={1}
                    border="2px"
                    borderColor="primary"
                />
            </Link>
        </Fragment>
    );

    return (
        <header>
            <nav aria-label="Top" className="mx-auto max-w-7xl px-2 sm:px-3">
                <Box borderBottom="1px" borderColor="#eaded0">
                    <Flex h="12" pb="1" alignItems="center">
                        <Box as={Link} to="/home" p={2} mt={2} display="flex" alignItems="center" cursor="pointer">
                            <FontAwesomeIcon icon={faHome} className="h-5 w-5 text-primary hover:text-primary" aria-hidden="true" />
                        </Box>
                        <Icon
                            as={FontAwesomeIcon}
                            icon={faSearch}
                            w="18px"
                            h="18px"
                            ml={3}
                            mt={2}
                            color="#8b705d"
                            onClick={onOpen}
                            cursor='pointer'
                        />
                        <Box ml="auto" display="flex" alignItems="center">
                            {links}
                        </Box>
                    </Flex>
                </Box>
            </nav>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <div
                        className="fixed inset-0 bg-btn-secondary opacity-20 cursor-pointer"
                        onClick={onClose}
                    />
                </DrawerOverlay>
                <DrawerContent className='rounded-r-xl' maxWidth='335px'  width={{ base: '200px', sm:'335px' }}>
                    <DrawerBody className='rounded-r-xl bg-background'  width={{ base: "100%"}}>
                        <Icon
                            as={FontAwesomeIcon}
                            icon={faClose}
                            w="18px"
                            h="18px"
                            mt={2}
                            mb={3}
                            color="#8b705d"
                            onClick={onClose}
                            cursor='pointer'
                            display={{ base: 'flex', sm:'none' }}
                        />
                        <Box className='relative my-2'>
                            <Flex
                                as="label"
                                htmlFor="my-drawer"
                                className='input h-11 mb-2 max-[280px]:h-10 rounded-3xl input-bordered bg-transparent flex items-center gap-2 border-secondary focus:border-primary hover:bg-transparent hover:border-primary'
                                placeholder='Search'
                                alignItems="center"
                                position="relative"
                            >
                                <Input
                                    id="my-drawer"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search user"
                                    variant="unstyled"
                                    flex="1"
                                    width='2rem'
                                    className='overflow-x-auto text-sm text-primary placeholder:text-btn-secondary placeholder:text-sm'
                                />
                                <Icon
                                    as={FontAwesomeIcon}
                                    icon={faSearch}
                                    position="absolute"
                                    right="1rem"
                                    top="0.75rem"
                                    w="4"
                                    h="4"
                                    color="#8b705d"
                                    onClick={handleSearch}
                                />
                            </Flex>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <ResultSearchChat
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && 
                            <Spinner 
                            mt={3} 
                            ml="auto" 
                            display="flex"
                            size="xl"
                            w={15}
                            h={15}
                            alignSelf="center"
                            color="#8b705d"
                        />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </header>
    );
}

export default ChatNav;
