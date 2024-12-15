import axios from "axios";
const BASE_URL = "http://localhost:5000/api/genres";

export const fetchGenresAPI = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.map(genre => ({
            value: genre._id,
            label: genre.name
        }));
    } catch (error) {
        console.error('Error fetching genres:', error);
        return []; // Return empty array or handle error as needed
    }
};

export const getAllGenresAPI = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const createGenreAPI = async (genreData) => {
    const response = await axios.post(`${BASE_URL}/create`, genreData , {
        withCredentials: true,
    });
    return response.data;
};

export const deleteGenreAPI = async (genreId) => {
    const response = await axios.delete(`${BASE_URL}/${genreId}`, {
        withCredentials: true,
    });
    return response.data;
};

export const updateGenreAPI = async (genreId, genreData) => {
    const response = await axios.put(`${BASE_URL}/${genreId}`, genreData, {
        withCredentials: true,
    });
    return response.data;
};

export const getGenreByIdAPI = async (genreId) => {
    const response = await axios.get(`${BASE_URL}/${genreId}`);
    return response.data;
};

// export const getGenreByNameAPI = async (genreName) => {
//     const response = await axios.get(`${BASE_URL}/name/${genreName}`);
//     return response.data;
// };



