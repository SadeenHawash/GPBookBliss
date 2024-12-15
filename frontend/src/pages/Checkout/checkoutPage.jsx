import CheckoutPageBody from '@/components/Checkout/CheckoutPageBody'
import PrivateNavbar from '@/components/Navbar/PrivateNavbar/PrivateNavbar'
import React from 'react'

const CheckoutPage = () => {
    return (
        <div className='w-screen'>
            <PrivateNavbar/>
            <CheckoutPageBody/>
        </div>
    )
}

export default CheckoutPage