import React from 'react'
import CreateStoryForm from './CreateStoryForm'

const CreateStoryBody = () => {
    return (
        <div className='h-screen mt-12 py-6 flex flex-col absolute left-0 w-full z-1 bg-background'>
            <CreateStoryForm/>
        </div>
    )
}

export default CreateStoryBody