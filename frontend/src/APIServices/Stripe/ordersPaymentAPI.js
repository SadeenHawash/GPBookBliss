import axios from "axios";
const BASE_URL = "http://localhost:5000/api/stripe";

//!Create post api
export const paymentIntentAPI = async (orderId) => {
    const response = await axios.post(
        `${BASE_URL}/checkout`,
        {
            orderId: orderId,
        },
        {
            withCredentials: true,
        }
    );
    return response.data;
};
//!payment verification
export const paymentVerificationAPI = async (paymentId) => {
    const response = await axios.get(`${BASE_URL}/verify/${paymentId}`, {
        withCredentials: true,
    });
    return response.data;
};