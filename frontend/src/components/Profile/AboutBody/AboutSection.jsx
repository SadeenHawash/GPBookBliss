import DashboardPageContainer from '@/components/Admin/Dashboard/DashboardPageContainer';
import SideBar from '@/components/Admin/Sidebar';
import React from 'react'

const AboutSection = () => {
    return (
        <div className='mt-1 max-w-7xl max-[280px]:p-0 overflow-hidden flex justify-center'>
            <div className='flex-1 flex gap-1 px-1 pr-3'>
                {/* <SideBar/> */}
                <DashboardPageContainer/>
            </div>
        </div>
    );
}

export default AboutSection