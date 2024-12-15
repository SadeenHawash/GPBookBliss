import React from 'react'
import { HiTrendingUp } from "react-icons/hi";
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoLibrary } from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa6';
import { FiMoreVertical } from "react-icons/fi";

const salesData = [
    {stats: '245', title: 'Sales', icon: <HiTrendingUp />, color: '#5b94f8', bgColor: '#c5dbff'},
    {stats: '120', title: 'Customers', icon: <BsFillPeopleFill />, color: '#eb568e', bgColor: '#fac9dc'},
    {stats: '150', title: 'Books', icon: <IoLibrary />, color: '#7abb68', bgColor: '#bcdcb3' },
    {stats: '$20k', title: 'Revenue', icon: <FaDollarSign />, color: '#fecc42', bgColor: '#fef6e1'},
]

const MonthlyOverview = () => {
    return (
        <div className='w-2/3 h-full bg-btn-secondary bg-opacity-15 flex gap-6 p-3 px-4 pl-5 rounded-lg'>
            <div className='flex flex-col gap-2 text-primary text-sm font-semibold'>
                <div className='flex justify-between text-primary text-xl'>
                    <p className='font-bold'> Monthly Overview </p>
                    <FiMoreVertical className='mt-1'/>
                </div>
                <p className='mt-2 text-btn-secondary'>Total 48.5% growth this month</p>
                <div className='flex mt-2 gap-20'>
                    {
                        salesData.map((item, index) => (
                            <div key={index} className='flex gap-2'>
                                <div style={{ backgroundColor: item.bgColor, color:item.color}} className={`text-3xl p-2 rounded-md`}>
                                    {item.icon}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p>{item.title}</p>
                                    <p style={{ color: item.color}} className={`text-lg font-bold`}>{item.stats}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MonthlyOverview