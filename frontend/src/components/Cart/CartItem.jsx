import { IconButton } from '@mui/material'
import React from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { calculateDiscountedPrice } from '../Book/calculations'
import { useOrderContext } from '@/context/orderContext'
import axios from 'axios'

const CartItem = ({show, item, quantity, cartItem}) => {
    const { setCartItems } = useOrderContext();

    const incrementQuantity = async () => {
        try {
            const response = await axios.put(`/api/cart/${cartItem._id}/increment`);
            if (response.status === 200) {
                setCartItems(prevItems =>
                    prevItems.map(i => (i._id === cartItem._id ? { ...i, quantity: i.quantity + 1 } : i))
                );
            }
        } catch (error) {
            console.error('Failed to increment item quantity:', error);
        }
    };

    const decrementQuantity = async () => {
        try {
            const response = await axios.put(`/api/cart/${cartItem._id}/decrement`);
            if (response.status === 200) {
                setCartItems(prevItems =>
                    prevItems.map(i => (i._id === cartItem._id ? { ...i, quantity: i.quantity - 1 } : i))
                );
            }
        } catch (error) {
            console.error('Failed to decrement item quantity:', error);
        }
    };

    const removeItem = async () => {
        try {
            const response = await axios.delete(`/api/cart/${cartItem._id}`);
            if (response.status === 200) {
                setCartItems(prevItems => prevItems.filter(i => i._id !== cartItem._id));
            } else {
                console.error('Failed to remove item from cart - Server responded with error:', response.status);
            }
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    return (
            <div className='w-full grid grid-cols-2 gap-2 shadow-md rounded-md p-3 bg-background border border-divider-color'>
                <div className='flex gap-3'>
                    <img
                        className='book object-fill rounded-md w-[6rem] h-[8rem]'
                        src={item?.image}
                    />
                    <div className='flex flex-col gap-2 text-primary'>
                        <p>{item?.title}</p>
                        <p>{item?.author}</p>
                        <div className='text-sm flex gap-3'>
                            <p className='font-semibold text-primary'>${calculateDiscountedPrice(item?.price,item?.discount)}</p>
                            <p className='line-through text-primary opacity-50'>${item?.price}</p>
                            <p className='font-semibold text-btn-secondary'>{item?.discount}% off</p>
                        </div>
                        <p className='w-[5rem] flex justify-center bg-btn-secondary bg-opacity-35 p-1 text-xs mt-2 rounded-xl'>Paperback</p>
                    </div>
                </div>
                {show &&
                    <div className='flex justify-between border-t-divider-color'>
                        <div className='flex items-center gap-6 text-primary text-sm'>
                            <IconButton onClick={decrementQuantity}>
                                <FaMinus className='cursor-pointer text-primary'/>
                            </IconButton>
                            <p className='text-lg font-bold'>{quantity}</p>
                            <IconButton onClick={incrementQuantity}>
                                <FaPlus className='cursor-pointer text-primary'/>
                            </IconButton>
                        </div>
                        <div>
                            <span className='flex justify-end flex-1'>
                                <FaTrash className='cursor-pointer text-primary hover:text-red-500' onClick={removeItem} />
                            </span>
                        </div>
                    </div>
                }
            </div>
    )
}

export default CartItem