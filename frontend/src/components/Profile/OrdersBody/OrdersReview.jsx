import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { fetchUserOrdersAPI } from '@/APIServices/Orders/ordersAPI';

const orderStatus = [
    {label:'On The Way', value:'on_the_way'},
    {label:'Delivered', value:'delivered'},
    {label:'Cancled', value:'cancled'},
    {label:'Returned', value:'returned'},
]

const OrdersReview = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await fetchUserOrdersAPI();
                setOrders(orders);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className='flex gap-4 my-3 mt-6'>
            <div className='w-1/5 h-[14rem] p-3 box rounded-lg bg-[#f8f5f1] border border-divider-color'>
                <div className='flex p-2'>
                    <span className='text-lg font-bold text-primary'>Order Status</span>
                </div>
                <div className='space-y-2'>
                    {orderStatus.map((option) => (
                        <div key={option.value} className="py-1 px-4 text-primary">
                            <input 
                                // onChange={() => handleFilter(option.value, filter.id)}
                                // id={`filter-${filter.id}-${optionIdx}`}
                                // name={`${filter.id}[]`}
                                // defaultChecked={option.checked}
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-3 w-3 border border-primary rounded-xl text-primary focus:bg-primary"
                            />
                            <label
                                htmlFor={option.value}
                                className="ml-3 text-sm min-w-0 flex-1 text-primary"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-4/5 max-h-[50rem] overflow-y-scroll flex flex-col gap-2 px-3'>
                {orders?.map((order) => (
                    <OrderCard key={order._id} order={order}/>
                ))}
            </div>
        </div>
    )
}

export default OrdersReview