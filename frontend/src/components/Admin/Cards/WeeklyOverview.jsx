import React from 'react';
import { Button } from '@mui/material';
import { FiMoreVertical } from "react-icons/fi";
import { BarChart } from '@mui/x-charts/BarChart';

const WeeklyOverview = () => {
    return (
        <div className='w-1/3 h-full bg-btn-secondary bg-opacity-15 flex flex-col gap-6 p-3 px-4 pl-5 rounded-lg'>
            <div className='flex justify-between text-primary text-xl'>
                <p className='font-bold'> Weekly Overview </p>
                <FiMoreVertical className='mt-1'/>
            </div>
            <div className='w-full'> 
                <BarChart
                    series={[
                        { data: [35, 44, 24, 34] },
                        { data: [51, 6, 49, 30] },
                        { data: [15, 25, 30, 50] },
                        { data: [60, 50, 15, 25] },
                    ]}
                    height={270}
                    xAxis={[{ data: ['This Week', 'Last Week', '2 Weeks', '3 Weeks'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 20, left: 30, right: 10 }}
                />
            </div>
            <Button variant='contained'> View Sales </Button>
        </div>
    )
}

export default WeeklyOverview