import React from 'react'
import { Button } from '@mui/material';
import { FiMoreVertical } from "react-icons/fi";
import { LineChart } from '@mui/x-charts/LineChart';

const TotalEarning = () => {
    return (
        <div className='w-1/3 h-full bg-btn-secondary bg-opacity-15 flex flex-col gap-6 p-3 px-4 pl-5 rounded-lg'>
            <div className='flex justify-between text-primary text-xl'>
                <p className='font-bold'> Total Earning </p>
                <FiMoreVertical className='mt-1'/>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-3xl font-bold mt-1 text-btn-secondary'> $24.895 </p>
                <p className='text-sm font-bold text-btn-secondary'> Compared to $84.375 last year</p>
                <div className='w-full'>
                <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    area: true,
                    },
                ]}
                width={380}
                height={280}
                />
            </div>
            </div>
        </div>
    )
}

export default TotalEarning