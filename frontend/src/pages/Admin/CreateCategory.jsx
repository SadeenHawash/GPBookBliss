import AdminPageNavbar from '@/components/Admin/AdminPageNavbar';
import CreateCategoryBody from '@/components/Admin/Category/CreateCategoryBody';
import React from 'react'

const CreateCategory = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl'>
                <AdminPageNavbar/>
                <CreateCategoryBody/>
            </div>
        </div>
    );
}

export default CreateCategory