import axiosInstance from "@/axiosInstance/axiosInstance";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/books";

export const getAllBooksAPI = async () => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
};

export const getAllBooksFilterAPI = async (query) => {
    const response = await axios.get(`/api/books/search?${query}`);
    return response.data;
};

export const fetchBook = async (bookId) => {
    const book = await axios.get(`${BASE_URL}/${bookId}`, {
        withCredentials: true,
    });
    return book.data;
}

export const createBookAPI = async (bookData) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, bookData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

export const userCreateBookAPI = async (bookData) => {
    try {
        const response = await axios.post(`${BASE_URL}/user-create`, bookData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

export const deleteBookAPI = async (bookId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${bookId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

export const addReviewAPI = async (bookId, reviewData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${bookId}/review`, reviewData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};

export const getMyReview = async (bookId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${bookId}/myreview`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error getting my review:', error);
        throw error;
    }
} 

export const searchBooksAPI = async ({
    search,
    category,
    rating,
    price,
    pages,
    discount,
    availability,
    page = 1,
    pageSize = 10,
}) => {
    try {
        // Define query parameters
        const params = {
            search,
            category,
            rating,
            price,
            pages,
            discount,
            availability,
            page,
            pageSize,
        };

        // Make GET request to /api/books/search endpoint with query params
        const response = await axiosInstance.get(`/books/search`, { params });

        // Return data from response
        return response.data;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};
