import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '@/context/orderContext';
import animationData from '../../animations/cart.json';
import axios from 'axios';
import Lottie from 'react-lottie';

const CartPageBody = () => {
    const navigate = useNavigate();
    const {cartItems, setCartItems, subtotal, setSubtotal, discount, setDiscount} = useOrderContext();
    const shippingCost = 10;
    const tax = 10;
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('/api/cart');
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data.items);
                    calculateOrderSummary(data.items);
                } else {
                    throw new Error('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        calculateOrderSummary(cartItems);
    }, [cartItems]);

    const calculateOrderSummary = (items) => {
        let subtotalAmount = 0;
        let discountAmount = 0;

        items.forEach((item) => {
            subtotalAmount += item.book.price * item.quantity;
            discountAmount += (item.book.price * item.quantity * item.book.discount) / 100;
        });

        setSubtotal(subtotalAmount);
        setDiscount(discountAmount);
    };

    const emptyCart = async () => {
        try {
            const response = await axios.delete('/api/cart');
            if (response.status === 200) {
                setCartItems([]);
            } else {
                console.error('Failed to empty cart - Server responded with error:', response.status);
            }
        } catch (error) {
            console.error('Failed to empty cart:', error);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout?step=2');
    };

    return (
        <div className='w-full container mt-10'>
            <div className='relative mb-3 border-b border-divider-color'>
                <div className='flex justify-between px-4 pt-8'>
                    <div className='py-3 text-primary text-2xl font-bold'>
                        Cart
                    </div>
                </div>
            </div>
            {cartItems.length == 0 ? (
                <div className='flex flex-col justify-center text-center py-20'>
                    <div>
                        <Lottie 
                            height='10%'
                            width='10%'
                            options={defaultOptions}
                        />  
                    </div>
                    <p className=' text-btn-secondary text-3xl font-bold'>Your Cart Is Empty</p>
                </div>
            ):(
                <div className='flex gap-2 py-3'>
                    <div className='w-3/4 flex flex-col gap-2'>
                        <div className='flex justify-between px-2 text-primary text-md'>
                            <p className='text-xl'>{cartItems.length} items</p>
                            <button className='text-sm font-semibold text-red-500' onClick={emptyCart}>
                                Empty cart
                            </button>
                        </div>
                        <div className='h-[350px] flex flex-col gap-2 p-1 overflow-y-scroll'>
                            {cartItems.map(item => (
                                <CartItem key={item._id} item={item.book} cartItem={item} quantity={item.quantity} show={true}/>
                            ))}
                        </div>
                    </div>
                    <div className='w-1/4 h-72 flex flex-col gap-2 shadow-lg mt-9 p-3 px-4 bg-background border border-divider-color rounded-lg'>
                        <p className='text-xl font-semibold text-primary border-b border-divider-color mb-2 py-1'>
                            Order Summary
                        </p>
                        <div className='flex flex-col gap-2 text-primary text-sm'>
                            <div className='flex justify-between'>
                                <p>Subtotal</p>
                                <p>${subtotal.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Discount</p>
                                <p>${discount.toFixed(2)}</p>
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
                                <p>${(subtotal - discount + shippingCost + tax).toFixed(2)}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className='w-full mt-2 py-2 px-4 flex justify-center border border-transparent rounded-md shadow-sm text-md font-bold bg-btn-primary hover:bg-opacity-90 text-primary'
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CartPageBody;
