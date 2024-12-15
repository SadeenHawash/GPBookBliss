import React from 'react'
import SideBar from '../Sidebar';
import CreateCategoryContainer from './CreateCategoryContainer';

const CreateCategoryBody = () => {
    return (
        <div className='h-screen mt-1 max-w-7xl max-[280px]:p-0 overflow-hidden flex justify-center'>
            <div className='flex-1 flex gap-1 px-1 pr-3'>
                <SideBar/>
                <CreateCategoryContainer/>
            </div>
        </div>
    );
}

export default CreateCategoryBody