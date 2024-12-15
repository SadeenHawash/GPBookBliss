import React from 'react'

const ResultSearchChat = ({handleFunction, user}) => {
    return (
        <div onClick={handleFunction} className='container cursor-pointer'>
            <div className='flex items-center gap-4 max-[280px]:gap-3 border-b border-divider-color mx-1 p-1 py-2 cursor-pointer hover:bg-secondary hover:bg-opacity-30'>
                <div className='avatar online'>
                    <div className='w-9 max-[280px]:w-8 rounded-full ring-2 ring-primary'>
                        <img src='https://avatar.iran.liara.run/public'
                        alt='user avatar' />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='font-bold max-[280px]:text-xs text-sm text-primary'>{user.fullName} </div>
                    <span className='text-[11px] text-btn-secondary'> {user.email} </span>
                </div>
            </div>
        </div>
    )
    
}

export default ResultSearchChat