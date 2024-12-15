import { useState , useContext, createContext  } from "react";

export const ReadingListsContext = createContext();

export const useReadingListsContext = () => {
    return useContext(ReadingListsContext);
}

export const ReadingListsContextProvider = ({children}) => {
    const [allBooks, setAllBooks] = useState([]);
    const [wantToReadBooks, setWantToReadBooks] = useState([]);
    const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
    const [finishedReadingBooks, setFinishedReadingBooks] = useState([]);
    return <ReadingListsContext.Provider value={{allBooks, setAllBooks, wantToReadBooks, setWantToReadBooks, currentlyReadingBooks, setCurrentlyReadingBooks, finishedReadingBooks, setFinishedReadingBooks}} >
        {children}
    </ReadingListsContext.Provider>;
}
