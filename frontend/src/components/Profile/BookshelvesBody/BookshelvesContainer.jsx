import React, { useEffect, useState } from 'react'
import ProfileNav from '../ProfileNav'
import Bookshelf from './Bookshelf'
import UserSection from '../UserSection'
import BookshelvesShow from './BookshelvesShow'
import GridBookshelves from './GridBookshelves'
import useBookshelfToggle from './useBookshelfToggle'
import Footer from '@/components/Footer/Footer'

const BookshelvesContainer = () => {
    const bookshelves = [
        {
            bookshelf: 'All',
            numBooks: 3
        },
        {
            bookshelf: 'Read',
            numBooks: 0
        },
        {
            bookshelf: 'Currently Reading',
            numBooks: 0
        },
        {
            bookshelf: 'Want to Read',
            numBooks: 3
        }
    ];
    

    const { isGridView, showGridBookshelves, showListBookshelves } = useBookshelfToggle();
    return (
        <div className='flex flex-col absolute left-0 w-full z-1 py-3 sm:px-9 bg-background'>
            <UserSection/>
            <ProfileNav />
            <BookshelvesShow
                isGridView={isGridView}
                showGridBookshelves={showGridBookshelves}
                showListBookshelves={showListBookshelves}
            />
            {isGridView ? (
                    <>
                    <GridBookshelves/>
                    </>
                ): (
                    <>
                    <div className='flex flex-col m-3 mt-5 gap-3'>
                    {bookshelves.map((bookshelf, index) => (
                        <Bookshelf bookshelf={bookshelf.bookshelf} numBooks={bookshelf.numBooks}  key={index} />
                    ))}
                    </div>
                    <button className='text-md text-btn-secondary p-3'>View More</button>
                    </>
                )}
            <Footer/>
        </div>
    )
}

export default BookshelvesContainer