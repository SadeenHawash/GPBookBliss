import React from 'react'
import UploadFirstCard from './UploadFirstCard'

const EmptySkeleton = (props) => {
    const skeletonArray = Array.from({length: 2})
    return (
        <div className='grid grid-cols-1 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 my-5'>
            <UploadFirstCard cardText={props.cardText} buttonLink={props.buttonLink}/>
            {skeletonArray.map((_, index) => (
                <div
                    key={index}
                    className="relative flex justify-center skeleton shadow-sm bg-background-secondary opacity-20 animate-pulse mt-6 p-2 h-[300px] w-[250px] min-[400px]:h-[420px] min-[400px]:w-[380px]"
                ></div>
            ))}
        </div>
    )
}

export default EmptySkeleton

{/* <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-5'>
            <UploadFirstCard cardText={props.cardText} buttonLink={props.buttonLink}/>
            {skeletonArray.map((_, index) => (
                <div
                    key={index}
                    className="relative flex justify-center skeleton my-3 shadow-sm bg-background-secondary opacity-20 animate-pulse h-[250px] w-[210px]"
                ></div>
            ))}
        </div> */}