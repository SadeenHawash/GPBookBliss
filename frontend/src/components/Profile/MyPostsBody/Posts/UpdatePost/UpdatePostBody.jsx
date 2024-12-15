import React from 'react'
import UpdatePostForm from './UpdatePostForm'

const UpdatePostBody = () => {
    return (
        <div className='flex flex-col absolute left-0 w-full h-screen z-1 py-3 sm:px-9 bg-background'>
            <UpdatePostForm/>
        </div>
    )
}

export default UpdatePostBody