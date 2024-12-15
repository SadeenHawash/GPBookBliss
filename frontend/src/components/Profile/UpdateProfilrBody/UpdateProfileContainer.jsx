import React from 'react'
import SideBar from './SideBar';
import ProfileUpdateContainer from './ProfileUpdateContainer';

const UpdateProfileContainer = () => {
    return (
        <div className='mt-20 w-screen h-screen px-6 overflow-hidden flex'>
            <div className='flex'>
                <div className=' W-1/3'>
                    <SideBar/>
                </div>
                <div className='W-2/3'>
                    <ProfileUpdateContainer/>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfileContainer