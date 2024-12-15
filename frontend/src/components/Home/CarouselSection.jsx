import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import CardCarousel from './CardCarousel';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { getAllBooksAPI } from '@/APIServices/Books/booksAPI';

const CarouselSection = ({ title, viewmore, card}) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getAllBooksAPI(); // Call your API function here
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const items = books.map((book) => <BookCard key={book._id} book={book}  val={card} />);

    return (
        <div className="relative mt-5 mb-1 border-t border-divider-color">
            <div className="flex justify-between px-4 pt-8">
                <div className="text-primary text-2xl font-bold">{title}</div>
                <div className="flex gap-1 text-btn-secondary text-sm">
                    <p>{viewmore}</p>
                    <LiaAngleRightSolid className="w-4 h-4 mt-1 font-thin" />
                </div>
            </div>
            <CardCarousel items={items} />
        </div>
    );
};

export default CarouselSection;


// import React from 'react'
// import BookCard from './BookCard'
// import CardCarousel from './CardCarousel'
// import { LiaAngleRightSolid } from "react-icons/lia";

// const CarouselSection  = ({title, card, viewmore}) => {
//     const items = [
//         <BookCard val={card}/>,
//         <BookCard val={card}/>,
//         <BookCard val={card}/>,
//         <BookCard val={card}/>,
//         <BookCard val={card}/>,
//         <BookCard val={card}/>,
//         <BookCard val={card}/>,
//         <BookCard val={card}/>,
//         <BookCard val={card}/>,
//     ];
//     return (
//         <div className='relative mt-5 mb-1 border-t border-divider-color '>
//             <div className='flex justify-between px-4 pt-8'>
//                 <div className=' text-primary text-2xl font-bold'>
//                     {title}
//                 </div>
//                 <div className='flex gap-1 text-btn-secondary text-sm'>
//                     <p>{viewmore}</p>
//                     <LiaAngleRightSolid className='w-4 h-4 mt-1 font-thin'/>
//                 </div>
//             </div>
//             <CardCarousel items={items}/>
//         </div>
//     )
// }

// export default CarouselSection 