import AdminPageNavbar from '@/components/Admin/AdminPageNavbar';
import OrdersPageBody from '@/components/Admin/Orders/OrdersPageBody';
import React from 'react'

const OrdersAdmin = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl'>
                <AdminPageNavbar/>
                <OrdersPageBody/>
            </div>
        </div>
    );
}

export default OrdersAdmin;