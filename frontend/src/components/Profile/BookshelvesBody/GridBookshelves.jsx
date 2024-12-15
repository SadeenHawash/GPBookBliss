import React, { useEffect, useState } from 'react'
import BookshelfCard from './BookshelfCard'
import { getAllReadingLists } from '@/APIServices/ReadingList/readingListAPI';
import { useNavigate } from 'react-router-dom';


const GridBookshelves = () => {
    const navigate = useNavigate();
    const [readingList, setReadingList] = useState(null);

    useEffect(() => {
        const fetchReadingList = async () => {
            try {
                const lists = await getAllReadingLists();
                setReadingList(lists);
            } catch (error) {
                console.error('Error fetching reading list:', error);
            }
        };

        fetchReadingList();
    }, [readingList]);
    console.log("Reading list: ",readingList);
    const wantToReadLength = readingList?.wantToRead?.length || 0;
    const currentlyReadingLength = readingList?.currentlyReading?.length || 0;
    const finishedReadingLength = readingList?.finishedReading?.length || 0;
    const AllLength = wantToReadLength + currentlyReadingLength + finishedReadingLength;

    return (
        <section className='overflow-hidden flex flex-col'>
            <div className='container px-1 mx-auto'>
                <div className="flex flex-wrap mt-4 mb-4 -mx-4">
                    {readingList && (
                        <>
                            <div className="w-full min-[440px] md:w-1/2 lg:w-1/4 p-4">
                                <BookshelfCard
                                    bookshelf='All'
                                    numBooks={AllLength}
                                    images={readingList?.wantToRead?.map((book) => ({
                                        url: book.image,
                                        alt: book.title
                                    }))}
                                    link='/profile/bookshelves/all'
                                />
                            </div>
                            <div className="w-full min-[440px] md:w-1/2 lg:w-1/4 p-4">
                                <BookshelfCard
                                    bookshelf='Finished Reading'
                                    numBooks={finishedReadingLength}
                                    images={readingList?.finishedReading?.map((book) => ({
                                        url: book.image,
                                        alt: book.title
                                    }))}
                                    link='/profile/bookshelves/finishedReading'
                                />
                            </div>
                            <div className="w-full min-[440px] md:w-1/2 lg:w-1/4 p-4">
                                <BookshelfCard
                                    bookshelf='Currently Reading'
                                    numBooks={currentlyReadingLength}
                                    images={readingList?.currentlyReading?.map((book) => ({
                                        url: book.image,
                                        alt: book.title
                                    }))}
                                    link='/profile/bookshelves/currentlyReading'
                                />
                            </div>
                            <div className="w-full min-[440px] md:w-1/2 lg:w-1/4 p-4">
                                <BookshelfCard
                                    bookshelf='Want to Read'
                                    numBooks={wantToReadLength}
                                    images={readingList?.wantToRead?.map((book) => ({
                                        url: book.image,
                                        alt: book.title
                                    }))}
                                    link='/profile/bookshelves/wantToRead'
                                />
                            </div>
                        </>
                    )}
                </div> 
            </div>
            <button className='text-md text-btn-secondary p-3'>View More</button>   
        </section>
    )
}

export default GridBookshelves
