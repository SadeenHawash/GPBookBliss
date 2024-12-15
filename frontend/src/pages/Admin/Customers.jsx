import AdminPageNavbar from '@/components/Admin/AdminPageNavbar';
import CustomersPageBody from '@/components/Admin/Customers/CustomersPageBody';
import React from 'react'

const Customers = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl'>
                <AdminPageNavbar/>
                <CustomersPageBody/>
            </div>
        </div>
    );
}

export default Customers