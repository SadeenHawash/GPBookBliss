import AdminPageNavbar from '@/components/Admin/AdminPageNavbar';
import Admin from '@/components/Admin/Dashboard/DashboardPageBody';
import React from 'react'

const Dashboard = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl'>
                <AdminPageNavbar/>
                <Admin/>
            </div>
        </div>
    );
}

export default Dashboard