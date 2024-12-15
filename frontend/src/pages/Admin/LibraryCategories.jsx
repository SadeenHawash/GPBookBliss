import AdminPageNavbar from '@/components/Admin/AdminPageNavbar';
import LibraryCategoriesPageBody from '@/components/Admin/Library/Categories/LibraryCategoriesPageBody';
import React from 'react'

const LibraryCategories = () => {
    return (
        <div className='absolute top-0 flex h-screen w-screen bg-background p-1 overflow-hidden'>
            <div className='chatPage flex flex-col h-full w-full bg-background rounded-xl'>
                <AdminPageNavbar/>
                <LibraryCategoriesPageBody/>
            </div>
        </div>
    );
}

export default LibraryCategories
