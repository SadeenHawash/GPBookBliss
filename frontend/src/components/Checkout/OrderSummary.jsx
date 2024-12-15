import React, { useEffect, useState } from 'react'
import AddressCard from '../AddressCard/AddressCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrderByIdAPI } from '@/APIServices/Orders/ordersAPI';
import OrderItem from '../Order/OrderItem';

const OrderSummary = () => {
    const location = useLocation();
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    const shippingCost = 10;
    const tax = 10;

    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');

    useEffect(() => {
        console.log('Order ID:', orderId); 
        const fetchOrder = async () => {
            try {
                const order = await getOrderByIdAPI(orderId);   
                setOrder(order);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);
    return (
        <div>
            <div className='container box p-5 rounded-lg my-5'>
                <AddressCard address={order.shippingAddress}/>
            </div>
            <div className='flex gap-2 py-3'>
                <div className='container box p-3 rounded-lg my-2 flex flex-col gap-4'>
                    <div className='h-[350px] flex flex-col gap-2 p-1 overflow-y-scroll'>
                        {order.orderItems?.map((item) => <OrderItem key={item._id} item={item.book} show={true}/>)}
                    </div>
                </div>
                <div className='w-1/3 h-72 flex flex-col gap-2 shadow-lg mt-2 p-3 px-4 bg-background border border-divider-color rounded-lg'>
                        <p className='text-xl font-semibold text-primary border-b border-divider-color mb-2 py-1'>
                            Price Details
                        </p>
                        <div className='flex flex-col gap-2 text-primary text-sm'>
                            <div className='flex justify-between'>
                                <p>Subtotal</p>
                                <p>${order.totalPrice}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Discount</p>
                                <p>${order.discount}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Shipping</p>
                                <p>${shippingCost.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Tax</p>
                                <p>${tax.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between mt-2 py-1 border-t border-divider-color'>
                                <p className='text-md font-semibold'>
                                    Total Amount
                                </p>
                                <p>${order?.orderTotal}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate(`/checkout?step=4&orderId=${orderId}`) }
                            className='w-full mt-2 py-2 px-4 flex justify-center border border-transparent rounded-md shadow-sm text-md font-bold bg-btn-primary hover:bg-opacity-90 text-primary'
                        >
                            Payment
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default OrderSummary