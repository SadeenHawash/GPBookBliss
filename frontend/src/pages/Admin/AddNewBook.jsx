import AdminPageNavbar from '@/components/Admin/AdminPageNavbar';
import CreateBookBody from '@/components/Admin/Book/CreateBookBody';
import React from 'react'

const AddNewBook = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl'>
                <AdminPageNavbar/>
                <CreateBookBody/>
            </div>
        </div>
    );
}

export default AddNewBook