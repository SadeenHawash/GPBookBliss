import React, { useEffect, useState } from 'react';
import Section1 from './section1';
import CarouselSection from './CarouselSection';
import Footer from '../Footer/Footer';
import BookCard from './BookCard';
import { useReadingListsContext } from '@/context/readingListsContext';
import { LiaAngleRightSolid } from 'react-icons/lia';

const HomeBody = () => {
    const { allBooks } = useReadingListsContext();

    useEffect(() => {
        console.log("All books from context: ", allBooks);
    }, [allBooks]);

    return (
        <div className='flex flex-col w-screen z-1 sm:px-9 bg-background'>
            <Section1 />
            <div className="relative mt-5 mb-1 border-t border-divider-color">
                <div className="flex justify-between px-4 pt-8">
                    <div className="text-primary text-2xl font-bold">Continue From Your Bookshelves</div>
                    <div className="flex gap-1 text-btn-secondary text-sm">
                        <p>View More</p>
                        <LiaAngleRightSolid className="w-4 h-4 mt-1 font-thin" />
                    </div>
                </div>
                <div className='relative py-6 px-3 pl-6 flex '>
                    {allBooks.map((book) => <BookCard key={book._id} book={book} val={true} />)}
                </div>
            </div>
            {/* <CarouselSection items={allBooksArray} title='Continue From Your Bookshelves' card={false} viewmore={'View More'} /> */}
            <CarouselSection title='Books Recommended For You' card={false} viewmore={'View More'} />
            <Footer />
        </div>
    );
};

export default HomeBody;
