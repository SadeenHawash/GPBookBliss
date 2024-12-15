import React from 'react'
import CreatePostForm from './CreatePostForm'

const CreatePostBody = () => {
    return (
        <div className='flex flex-col absolute left-0 w-full z-1 py-3 sm:px-9 bg-background'>
            <CreatePostForm/>
        </div>
    )
}

export default CreatePostBody