import React from 'react'
import AchivementCard from '../Cards/AchivementCard'
import MonthlyOverview from '../Cards/MonthlyOverview'
import WeeklyOverview from '../Cards/WeeklyOverview'
import TotalEarning from '../Cards/TotalEarning'
import SmallCards from '../Cards/SmallCards'

const DashboardPageContainer = () => {
    return (
        <div className='w-[92%] p-1 flex flex-col gap-2'>
            <div className='flex gap-2 h-[28%]'>
                <AchivementCard/>
                <MonthlyOverview/>
            </div>
            <div className='flex gap-2 h-[70%]'>
                <WeeklyOverview/>
                <TotalEarning/>
                <SmallCards/>
            </div>
        </div>
    )
}

export default DashboardPageContainer