import axios from "axios";
const BASE_URL = "http://localhost:5000/api/readinglist";

export const getAllReadingLists = async () => {
    const readingList = await axios.get(BASE_URL, {
        withCredentials: true,
    });
    return readingList.data;
};

export const getReadingListBooks = async (listName) => {
    try {
        const response = await axios.get(`${BASE_URL}/list/${listName}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching reading list books');
    }
};

export const addBookToList = async (bookId, listName) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, {
            bookId,
            listName
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error adding book to list:', error);
        throw error;
    }
};

export const removeBookFromList = async (bookId, listName) => {
    const response = await axios.post(`${BASE_URL}/remove`, {
        bookId,
        listName,
    }, {
        withCredentials: true,
    });
    return response.data;
};

export const moveBookBetweenLists = async (bookId, toList) => {
    try {
        const response = await axios.post(`${BASE_URL}/move`, {
            bookId,
            toList
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error moving book between lists:', error);
        throw error;
    }
};

export const getUserReadingList = async () => {
    const response = await axios.get(`${BASE_URL}`, {
        withCredentials: true,
    });
    return response.data;
};

export const checkBookStatus = async (bookId) => {
    const response = await axios.get(`${BASE_URL}/status/${bookId}`, {
        withCredentials: true,
    });
    return response.data.status;
};