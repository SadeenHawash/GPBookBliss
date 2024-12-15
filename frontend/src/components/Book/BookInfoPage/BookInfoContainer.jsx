import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import Footer from '@/components/Footer/Footer'
import CarouselSection from '@/components/Home/CarouselSection'
import { fetchBook } from '@/APIServices/Books/booksAPI'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const BookInfoContainer = () => {
    const { bookId } = useParams();
    const { data } = useQuery({
        queryKey: ['book-details', bookId],
        queryFn: () => fetchBook(bookId)
    });
    const series = true;
    return (
        <div className='container w-full mt-14 p-2 bg-background h-auto'>
            <div className='flex-1 flex max-[900px]:flex-col py-2 px-10'>
                <LeftSection data={data?.bookFounded}/>
                <RightSection data={data?.bookFounded}/>
            </div>
            {series && <CarouselSection title='It Ends with Us Series' card={false} viewmore='All books in this series'/> }
            <CarouselSection title='Readers also enjoyed' card={false} viewmore='All similar books'/>
            <CarouselSection title='Other books by Colleen Hoover' card={false} viewmore='All books by this author'/>
            <Footer/>
        </div>
    )
}

export default BookInfoContainer