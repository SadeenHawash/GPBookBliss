import React from 'react'
import BookCard from '../Home/BookCard'

const ResultView = () => {
    return (
        <div className='w-full sm:w-3/4 grid grid-cols-1 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <BookCard val={false}/>
            <BookCard val={false}/>
            <BookCard val={false}/>
            <BookCard val={false}/>
            <BookCard val={false}/>
            <BookCard val={false}/>
        </div>
    )
}

export default ResultView