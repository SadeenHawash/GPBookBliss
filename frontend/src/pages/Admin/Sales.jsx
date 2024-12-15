import AdminPageNavbar from '@/components/Admin/AdminPageNavbar';
import SalesPageBody from '@/components/Admin/Sales/SalesPageBody';
import React from 'react'

const Sales = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl'>
                <AdminPageNavbar/>
                <SalesPageBody/>
            </div>
        </div>
    );
}

export default Sales