import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CgPlayListRemove } from "react-icons/cg";
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import { useReadingListsContext } from '@/context/readingListsContext';


const BookListItem = ({book}) => {
    const navigate = useNavigate();
    const { listName } = useParams();
    const { setAllBooks, setWantToReadBooks, setCurrentlyReadingBooks, setFinishedReadingBooks } = useReadingListsContext();
    const removeItem = async () => {
        try {
            const response = await axios.delete(`/api/readinglist/${listName}/${book?._id}/remove`);
            
            if (response.status === 200) {
                if (listName === 'all') {
                    setAllBooks(prevItems => prevItems.filter(i => i._id !== book?._id));
                } else if (listName === 'wantToRead') {
                    setWantToReadBooks(prevItems => prevItems.filter(i => i._id !== book?._id));
                } else if (listName === 'currentlyReading') {
                    setCurrentlyReadingBooks(prevItems => prevItems.filter(i => i._id !== book?._id));
                } else if (listName === 'finishedReading') {
                    setFinishedReadingBooks(prevItems => prevItems.filter(i => i._id !== book?._id));
                }
            } else {
                console.error('Failed to remove item from list - Server responded with error:', response.status);
            }
        } catch (error) {
            console.error('Failed to remove item from list:', error);
        }
    };

    return (
        <div className='w-full mt-3 relative grid-cols-2 gap-2 shadow-md rounded-md p-3 bg-background border border-divider-color flex justify-between'>
            <div className='flex gap-3'>
                <div className=''>
                    <img
                        className='book object-contain w-[6rem] h-[8rem] rounded-md cursor-pointer'
                        src={book?.image}
                        onClick={ () => navigate('/view')}
                    />
                </div>
                <div className='flex flex-col gap-2 text-primary'>
                    <p>{book?.title}</p>
                    <p>{book?.author}</p>
                    <LinearProgress
                        variant="determinate"
                        value={30}
                        sx={{ width: '250px', height: '3%' }}
                        className='mt-5 rounded-lg cursor-pointer'
                        onClick={() => navigate(`/view/${book?._id}`) } 
                    />
                    <div className='text-sm flex gap-3 mt-2'>
                        <p className='font-semibold text-primary'>{book?.numberOfPages}</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-2 text-primary items-center absolute top-2 right-2'>
                <CgPlayListRemove
                    onClick={removeItem}
                    className=' w-8 h-8 cursor-pointer'
                />
            </div>
        </div>
    )
}

export default BookListItem