import React from 'react'
import AdminPageNavbar from '@/components/Admin/AdminPageNavbar';
import LibraryPageBody from '@/components/Admin/Library/Books/LibraryPageBody';

const Library = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl'>
                <AdminPageNavbar/>
                <LibraryPageBody/>
            </div>
        </div>
    );
}

export default Library