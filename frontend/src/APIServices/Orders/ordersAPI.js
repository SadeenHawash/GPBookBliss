import axiosInstance from "@/axiosInstance/axiosInstance";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/order";

export const fetchAllOrders = async () => {
    const orders = await axios.get(BASE_URL, {
        withCredentials: true,
    });
    return orders.data;
}

export const fetchUserOrdersAPI = async () => {
    const orders = await axios.get(`${BASE_URL}/my-orders`, {
        withCredentials: true,
    });
    return orders.data;
}

export const createOrderAPI = async (orderData) => {
    const response = await axios.post(BASE_URL, orderData, {
        withCredentials: true,
    });
    return response.data;
}

export const getOrderByIdAPI = async (orderId) => {
    const response = await axios.get(`${BASE_URL}/${orderId}`, {
        withCredentials: true,
    });
    return response.data;
}

export const deleteOrderAPI = async (orderId) => {
    const response = await axios.delete(`${BASE_URL}/${orderId}`, {
        withCredentials: true,
    });
    return response.data;
}

export const updateOrderAPI = async (orderId, orderData) => {
    const response = await axios.put(`${BASE_URL}/${orderId}`, orderData, {
        withCredentials: true,
    });
    return response.data;
}

export const getOrderItemsAPI = async (orderId) => {
    const response = await axios.get(`${BASE_URL}/${orderId}/items`);
    return response.data;
}

export const placeOrderAPI = async (orderId) => {
    const response = await axiosInstance.put(`${BASE_URL}/${orderId}/place`,{
        withCredentials: true,
    });
    return response.data;
}

export const confirmedOrderAPI = async (orderId) => {
    const response = await axiosInstance.put(`${BASE_URL}/${orderId}/confirm`,{
        withCredentials: true,
    });
    return response.data;
}

export const shipOrderAPI = async (orderId) => {
    const response = await axiosInstance.put(`${BASE_URL}/${orderId}/ship`,{
        withCredentials: true,
    });
    return response.data;
}

export const deliverOrderAPI = async (orderId) => {
    const response = await axiosInstance.put(`${BASE_URL}/${orderId}/deliver`,{
        withCredentials: true,
    });
    return response.data;
}

export const cancelOrderAPI = async (orderId) => {
    const response = await axiosInstance.put(`${BASE_URL}/${orderId}/cancel`,{
        withCredentials: true,
    });
    return response.data;
}

export const getUserShippingAddresses = async () => {
    const response = await axios.get(`${BASE_URL}/shippingAddresses`, {
        withCredentials: true,
    });
    return response.data;
}



