import React from 'react'
import ProfileNav from '../ProfileNav';
import UserSection from '../UserSection';
import OrdersReview from './OrdersReview';
import Footer from '@/components/Footer/Footer';

const OrdersContainer = () => {
    const empty = false;
    return (
        <div className='flex flex-col absolute left-0 w-full z-1 py-3 sm:px-9 bg-background'>
            <UserSection/>
            <ProfileNav/>
            {empty ? (
                <>
                <div className='flex flex-col justify-center items-center h-72'>
                    <p className='text-sm text-gray-500'>You have not ordered yet.</p>
                </div>
                </>
            ):
            (
                <>
                    <OrdersReview/>
                </>
            )
            }
            <Footer/>
        </div>
    )
}

export default OrdersContainer