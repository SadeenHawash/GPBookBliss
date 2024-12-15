import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { LinearProgress } from '@mui/material';

const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountDecimal = discountPercentage / 100;
    const discountedPrice = originalPrice * (1 - discountDecimal);
    return discountedPrice.toFixed(2);
};

const BookCard = ({val, book}) => {
    const discountedPrice = calculateDiscountedPrice(book.price, book.discount);
    const saved = true;
    const navigate = useNavigate();
    // /book/${book.id}

    return (
        <div onClick={() => navigate(`/book/${book?._id}`)} className=' relative bookCard box cursor-pointer flex flex-col gap-5 items-center justify-center bg-background-secondary bg-opacity-10 rounded-lg
                        overflow-hidden w-[12rem] mx-3 my-3 text-primary'>
            <div className='w-full h-[10rem] bg-btn-secondary bg-opacity-10 border-b border-divider-color flex justify-center'>
                <div className='w-[8rem] h-[12rem] pt-5'>
                    <img
                        className='book object-cover w-full h-full rounded-md'
                        //src='https://imgv2-2-f.scribdassets.com/img/word_document/490661086/original/432x574/b566717a7e/1716559381?v=1'
                        src={book.image}
                    />
                </div>
            </div>
            <div className=' flex-col gap-2 px-2 pt-5 pb-2 my-1 text-center'>
                <div className='flex flex-col gap-2 px-2'>
                    <p className={`ellipsis ${val ? 'text-lg font-medium' : 'text-md font-normal'}`}>{book.title}</p>
                    <Link className={`${val ? 'text-sm' : 'text-xs'}`}>{book.author}</Link>
                </div>
                { val ? 
                
                (<div className='flex justify-between mt-4'>
                    <div>
                        <LinearProgress
                            variant="determinate"
                            value={30}
                            sx={{ width:'130px', height: '10%' }}
                            className='mt-4 pb-1 rounded-lg absolute left-2 bottom-0'
                        />
                    </div>
                    {saved ? 
                        <BsBookmarkFill className='w-4 h-4 mt-1 ml-10 text-primary absolute right-2 bottom-2'/>
                        : 
                        <BsBookmark className='w-4 h-4 mt-1  ml-10 text-primary absolute right-2 bottom-2 '/>
                    }
                </div>)
                
                :
            
                    (<div className='flex mt-4 items-center justify-center'>
                        <div className='text-sm flex gap-3 items-center'>
                            <p className='font-semibold text-primary'>${discountedPrice}</p>
                            {book.discount > 0 && 
                                <>
                                <p className='line-through font-semibold text-primary opacity-50'>${book.price}</p>
                                <p className='font-semibold text-btn-secondary'>{book.discount}% off</p>
                                </>
                            }
                        </div>
                    </div>)
                
            }
            </div>
        </div>
    )
}

export default BookCard