import React from 'react'
import { Button } from '@mui/material'
import winningCupImage from '../../../assets/winningCup.png';

const AchivementCard = () => {
    return (
        <div className='w-1/3 h-full bg-btn-secondary bg-opacity-15 flex gap-6 p-3 px-4 pl-5 rounded-lg'>
            <div className='flex flex-col gap-2 text-primary text-sm font-semibold'>
                <p className='text-primary text-lg font-bold'> Shop With BookBliss </p>
                <p className=' text-xl mt-5 mb-2 text-btn-secondary'> 420 </p>
                <Button size='small' variant='contained' className='mt-2'> View Sales </Button>
            </div>
            <div className='w-[7rem] h-[7rem]'>
                <img
                    className='object-contain'
                    src={winningCupImage}
                />
            </div>
        </div>
    )
}

export default AchivementCard