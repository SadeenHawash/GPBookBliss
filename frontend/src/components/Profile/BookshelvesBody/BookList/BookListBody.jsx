import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookListItem from './BookListItem';
import { getReadingListBooks } from '@/APIServices/ReadingList/readingListAPI';
import { useReadingListsContext } from '@/context/readingListsContext';
import Footer from '@/components/Footer/Footer';

const BookListBody = () => {
    const { listName } = useParams();
    const { allBooks, setAllBooks, wantToReadBooks, setWantToReadBooks, currentlyReadingBooks, setCurrentlyReadingBooks, finishedReadingBooks, setFinishedReadingBooks } = useReadingListsContext();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const wantToRead = await getReadingListBooks('wantToRead');
                const currentlyReading = await getReadingListBooks('currentlyReading');
                const finishedReading = await getReadingListBooks('finishedReading');
                
                setWantToReadBooks(wantToRead);
                setCurrentlyReadingBooks(currentlyReading);
                setFinishedReadingBooks(finishedReading);

                const allBooksCombined = [...wantToRead, ...currentlyReading, ...finishedReading];
                setAllBooks(allBooksCombined);

                if (listName === 'all') {
                    setBooks(allBooksCombined);
                } else if (listName === 'wantToRead') {
                    setBooks(wantToRead);
                } else if (listName === 'currentlyReading') {
                    setBooks(currentlyReading);
                } else if (listName === 'finishedReading') {
                    setBooks(finishedReading);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchBooks();
    }, [listName, setAllBooks, setWantToReadBooks, setCurrentlyReadingBooks, setFinishedReadingBooks]);

    const [books, setBooks] = useState([]);

    return (
        <div className='w-full container mt-10'>
            <div className='relative mb-3 border-b border-divider-color'>
                <div className='flex justify-between px-3 pt-8'>
                    <div className='py-4 text-primary text-3xl font-bold'>
                        {listName === 'wantToRead' ? 'Want to read' : listName === 'currentlyReading' ? 'Currently reading' : listName === 'finishedReading' ? 'Finished reading' : listName === 'all' ? 'All' : 'All'}
                    </div>
                </div>
            </div>
            <div className='container py-5'>
                {listName === 'wantToRead' ? 
                    wantToReadBooks.map((book) => (
                        <BookListItem key={book?._id} book={book} />
                    )) : 
                listName === 'currentlyReading' ? 
                    currentlyReadingBooks.map((book) => (
                        <BookListItem key={book?._id} book={book} />
                    )) : 
                listName === 'finishedReading' ? 
                    finishedReadingBooks.map((book) => (
                        <BookListItem key={book?._id} book={book} />
                    )) : 
                allBooks.map((book) => (
                    <BookListItem key={book?._id} book={book} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default BookListBody;
