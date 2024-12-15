import PrivateNavbar from '@/components/Navbar/PrivateNavbar/PrivateNavbar'
import OrderDetails from '@/components/Order/OrderDetails'
import React from 'react'

const OrderDetailsPage = () => {
    return (
        <div className='w-screen'>
            <PrivateNavbar/>
            <OrderDetails/>
        </div>
    )
}

export default OrderDetailsPage