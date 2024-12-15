import CartPageBody from '@/components/Cart/CartPageBody'
import Footer from '@/components/Footer/Footer'
import PrivateNavbar from '@/components/Navbar/PrivateNavbar/PrivateNavbar'
import React from 'react'

const Cart = () => {
    return (
        <div className='w-screen'>
            <PrivateNavbar/>
            <CartPageBody/>
        </div>
    )
}

export default Cart