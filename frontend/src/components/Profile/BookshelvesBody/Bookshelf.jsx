import React from 'react'
import ActiveSlider from '../../Slider/ActiveSlider'

const Bookshelf = (props) => {
    return (
        <div>
            <div className='relative flex flex-col p-1 gap-2 border-b border-divider-color'>
                <div className='text-2xl font-semibold text-primary'>{props.bookshelf}
                    <span className='text-lg font-normal ml-2 text-btn-secondary'> - {props.numBooks} -</span>
                </div>
                { !props.numBooks ? (<div className="skeleton my-3 shadow-sm bg-background-secondary opacity-20 animate-pulse h-[130px] w-[100px] lg:h-[250px] lg:w-[200px]"></div>): (
                    <>
                    <ActiveSlider/> 
                    <div className='mt-3'>
                        <div className='absolute right-9 bottom-0 p-4'>
                            <button className=' text-btn-secondary'>View</button>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Bookshelf