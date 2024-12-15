import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import CategoryNav from './CategoryNav'
import CategoryContainer from './CategoryContainer'
import Footer from '../Footer/Footer'

const CategoryBody = () => {
    return (
        <div className='w-full absolute left-0 top-12 p-2 pt-8 bg-background h-auto'>
            <div className='flex gap-1 text-primary text-sm font-medium sm:px-8 py-4'>
                <p className='ellipsis'>All categories </p>
                <FaAngleRight className='w-4 h-4 mt-1 text-xs text-primary font-light'/>
                {/* className='ellipsis' */}
                <p>Science & Mathematics</p>
                <FaAngleRight className='w-4 h-4 mt-1 text-sm text-primary'/>
            </div>
            <h1 className='text-3xl sm:text-5xl font-extrabold text-primary sm:px-8 py-4'>Psychology</h1>
            <div className='sm:mx-8 my-8'>
                <CategoryNav/>
            </div>
            <CategoryContainer/>
            <Footer/>
        </div>
    )
}

export default CategoryBody