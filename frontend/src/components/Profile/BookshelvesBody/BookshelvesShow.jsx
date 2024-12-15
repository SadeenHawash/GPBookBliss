import { Tooltip } from '@chakra-ui/react';
import React from 'react'
import { IoGrid } from 'react-icons/io5'
import { PiRowsFill } from "react-icons/pi";
import { Link } from 'react-router-dom';

const BookshelvesShow = ({ isGridView, showGridBookshelves, showListBookshelves }) => {
    return (
        <div className='relative mt-5 mb-1 text-btn-secondary'>
            <div className='flex justify-between px-4'>
                <Tooltip 
                    label='View more'
                    placement='right-start'
                    background="#e2d0bb"
                    borderRadius="2xl"
                    color="#6F4E37"
                    fontSize="16px"
                    p={1}
                    px={3}
                    mt={2}
                >
                    <Link className='text-3xl text-primary font-semibold'>Bookshelves</Link>
                </Tooltip>
                <div className='flex gap-1'>
                    <IoGrid onClick={showGridBookshelves}
                        className={`w-6 h-6 mt-2 cursor-pointer ${isGridView ? 'text-btn-secondary text-opacity-60' : 'text-primary'}`}
                    />
                    <PiRowsFill
                        onClick={showListBookshelves}
                        className={`w-8 h-10 cursor-pointer ${!isGridView ? 'text-btn-secondary text-opacity-60' : 'text-primary'}`}
                    />
                </div>
            </div>
        </div>
    )
}

export default BookshelvesShow