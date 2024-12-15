import { useState , useContext, createContext  } from "react";

export const ChatContext = createContext();

export const useChatContext = () => {
    return useContext(ChatContext);
}

export const ChatContextProvider = ({children}) => {
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [notification, setNotification] = useState([]);
    
    return <ChatContext.Provider value={{selectedChat, setSelectedChat, chats, setChats, messages, setMessages, newMessage, setNewMessage, notification, setNotification}} >
        {children}
    </ChatContext.Provider>;
}

