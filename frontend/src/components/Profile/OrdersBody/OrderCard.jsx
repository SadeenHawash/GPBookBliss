import React from 'react'
import { useNavigate } from 'react-router-dom';

const OrderCard = ({order}) => {
    const navigate = useNavigate();
    const delivered = true;
    return (
        <div onClick={() => navigate(`/profile/order/${order?._id}`)}  className='cursor-pointer w-full grid grid-cols-2 gap-2 shadow-md rounded-md p-3 bg-background border border-divider-color'>
            <div className='flex gap-3'>
                    <div className='w-[5rem] h-[7rem]'>
                        <img
                            className='book object-contain rounded-md'
                            src={order.orderItems[0].book.image}
                        />
                    </div>
                    <div className='flex flex-col gap-2 text-primary mt-1'>
                        <p>{order.orderItems[0].book.title}</p>
                        <p>{order.orderItems[0].book.author}</p>
                    </div>
            </div>
            <div className='flex justify-between mt-1'>
                <p className='text-xl font-bold text-primary'>{order.orderTotal}$</p>
                <div className='flex flex-col gap-1 text-primary px-3'>
                    { delivered ? (
                        <>
                        <p className='text-md font-bold text-primary'>Delivered On July 06</p>
                        <span className='text-btn-secondary text-sm'>
                            Your Items Has Been Delivered
                        </span>
                        </>
                    ) : (
                        <p className='text-md font-bold text-primary'>Expected Delivery On July 06</p>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default OrderCard