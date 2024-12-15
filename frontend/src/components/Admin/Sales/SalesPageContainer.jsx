import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SalesPageContainer() {
    return (
        <div className='w-full flex flex-col'>
            <div className='relative mx-2 border-b mb-1 border-divider-color'>
                    <div className='flex justify-between px-2 pt-1'>
                        <div className='py-1 text-primary text-3xl font-bold'>
                            Sales
                        </div>
                    </div>
            </div>
            <div className='w-full flex justify-center items-center ml-16 mt-16'>
                <div className='w-1/2 flex flex-col gap-8 justify-center text-center'> 
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
                    <p className='font-bold text-xl text-primary'> Weekly Overview </p>
                </div>
                <div className='w-1/2 flex flex-col gap-7 justify-center text-center'>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                    <p className='font-bold text-xl text-primary pr-10'>Total Earning </p>
                </div>
            </div>
        </div>
    );
}
