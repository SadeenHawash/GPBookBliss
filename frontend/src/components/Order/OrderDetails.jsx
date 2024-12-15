import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import OrderItem from './OrderItem'
import { useParams } from 'react-router-dom'
import { getOrderByIdAPI } from '@/APIServices/Orders/ordersAPI'

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const order = await getOrderByIdAPI(orderId);   
                setOrder(order);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchOrder();
    }, []);
    return (
        <div className='w-full container mt-20 flex flex-col gap-4'>
            <div className='container box p-3 rounded-lg my-2 flex flex-col gap-4'>
                <p className='font-bold text-xl text-primary border-b border-divider-color py-2'>Delivery Address</p>
                <AddressCard address={order.shippingAddress}/>
            </div>
            <OrderTracker status={order.orderStatus}/>
            <div className='container box p-3 rounded-lg my-2 flex flex-col gap-4'>
                <div className='h-[350px] flex flex-col gap-2 p-1 overflow-y-scroll'>
                    {order?.orderItems?.map((item) => <OrderItem key={item._id} item={item.book} show={false}/>)}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OrderDetails