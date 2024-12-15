import React from 'react'
import { BsHandbagFill } from 'react-icons/bs'
import { FaDollarSign, FaQuestion } from 'react-icons/fa'
import { FiMoreVertical } from 'react-icons/fi'
import { SiGoogleanalytics } from 'react-icons/si'

const SmallCards = () => {
    return (
        <div className='w-1/3 h-full flex flex-col gap-2 rounded-lg'>
            <div className='h-1/2 w-full flex gap-2'>
                <div className='w-full bg-btn-secondary bg-opacity-15 rounded-lg p-3 flex flex-col gap-3'>
                    <div className='flex justify-between text-primary text-xl'>
                        <div style={{ backgroundColor: '#dacee6', color:'#663398'}} className='text-2xl p-3 rounded-full'>
                            <SiGoogleanalytics /> 
                        </div>
                        <FiMoreVertical className='mt-1'/>
                    </div>
                    <p className='text-md font-bold text-primary'>Total Profit</p>
                    <p className='text-2xl font-bold text-purple-700'> $25.6k <span className='ml-2 text-primary text-xs'>+42%</span></p>
                    <p className='text-sm font-bold text-btn-secondary'> Weekly Profit</p>
                </div>
                <div className='w-full bg-btn-secondary bg-opacity-15 rounded-lg p-3 flex flex-col gap-3'>
                    <div className='flex justify-between text-primary text-xl'>
                        <div style={{ backgroundColor: '#fef6e1', color:'#fecc42'}} className='text-2xl p-3 rounded-full'>
                            <FaDollarSign />
                        </div>
                        <FiMoreVertical className='mt-1'/>
                    </div>
                    <p className='text-md font-bold text-primary'>Refunds</p>
                    <p className='text-2xl font-bold text-yellow-500'> $78 <span className='ml-2 text-primary text-xs'>-15%</span></p>
                    <p className='text-sm font-bold text-btn-secondary'> Past Month</p>
                </div>
            </div>
            <div className='h-1/2 w-full flex gap-2'>
                <div className='w-full bg-btn-secondary bg-opacity-15 rounded-lg p-3 flex flex-col gap-3'>
                    <div className='flex justify-between text-primary text-xl'>
                        <div style={{ backgroundColor: '#bcdcb3', color:'#7abb68'}} className='text-2xl p-3 rounded-full'>
                            <BsHandbagFill />
                        </div>
                        <FiMoreVertical className='mt-1'/>
                    </div>
                    <p className='text-md font-bold text-primary'> New Orders</p>
                    <p className='text-2xl font-bold text-green-600'> 20 <span className='ml-2 text-primary text-xs'>-18%</span></p>
                    <p className='text-sm font-bold text-btn-secondary'> Weekly Orders</p>
                </div>
                <div className='w-full bg-btn-secondary bg-opacity-15 rounded-lg p-3 flex flex-col gap-3'>
                    <div className='flex justify-between text-primary text-xl'>
                        <div style={{ backgroundColor: '#fac9dc', color:'#eb568e'}} className='text-2xl p-3 rounded-full'>
                            <FaQuestion />
                        </div>
                        <FiMoreVertical className='mt-1'/>
                    </div>
                    <p className='text-md font-bold text-primary'> Sales Queries</p>
                    <p className='text-2xl font-bold text-pink-600'> 15 <span className='ml-2 text-primary text-xs'>-18%</span></p>
                    <p className='text-sm font-bold text-btn-secondary'> Last Week</p>
                </div>
            </div>
            {/* <div className='flex justify-between text-primary text-xl'>
                <p className='font-bold'> Total Earning </p>
                <FiMoreVertical className='mt-1'/>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-3xl font-bold mt-1 text-btn-secondary'> $24.895 </p>
                <p className='text-sm font-bold text-btn-secondary'> Compared to $84.375 last year</p>
                <div className='w-full'>
            </div>
            </div> */}
        </div>
    )
}

export default SmallCards