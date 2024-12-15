import axios from "axios";
const BASE_URL = "http://localhost:5000/api/auth";

export const fetchAllUsers = async () => {
    const users = await axios.get(BASE_URL);
    return users.data;
}