import React from 'react'

const ChatLoading = () => {
    return (
        <div className='m-3'>
            <div className="skeleton w-full h-14 bg-btn-secondary bg-opacity-25 animate-pulse"/>
            <div className="skeleton w-full h-14 mt-1 bg-btn-secondary bg-opacity-25 animate-pulse"/>
            <div className="skeleton w-full h-14 mt-1 bg-btn-secondary bg-opacity-25 animate-pulse"/>
            <div className="skeleton w-full h-14 mt-1 bg-btn-secondary bg-opacity-25 animate-pulse"/>
            <div className="skeleton w-full h-14 mt-1 bg-btn-secondary bg-opacity-25 animate-pulse"/>
            <div className="skeleton w-full h-14 mt-1 bg-btn-secondary bg-opacity-25 animate-pulse"/>
            <div className="skeleton w-full h-14 mt-1 bg-btn-secondary bg-opacity-25 animate-pulse"/>
            <div className="skeleton w-full h-14 mt-1 bg-btn-secondary bg-opacity-25 animate-pulse"/>
        </div>
    )
}

export default ChatLoading