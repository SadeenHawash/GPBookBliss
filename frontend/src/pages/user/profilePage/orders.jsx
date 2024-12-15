import React from 'react'
import PrivateNavbar from '../../../components/Navbar/PrivateNavbar/PrivateNavbar'
import OrdersContainer from '../../../components/Profile/OrdersBody/OrdersContainer'
export default function Orders() {
    return (
        <div >
            <PrivateNavbar />
            <OrdersContainer/>
        </div>
    )
}