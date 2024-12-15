import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import FiltersNav from './FiltersNav'
import BookCard from '../Home/BookCard'
import { getAllBooksAPI } from '@/APIServices/Books/booksAPI'

const SearchPageBody = ({ searchResults }) => {
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getAllBooksAPI(); // Call your API function here
                setBooksData(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);
    return (
        <div className='w-full absolute left-0 top-8 p-2 pt-8 bg-background h-auto'>
            <div className='container'>
                <FiltersNav/>
            </div>
            <Footer/>
        </div>
    )
}

export default SearchPageBody