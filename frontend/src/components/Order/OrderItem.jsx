import { StarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateDiscountedPrice } from '../Book/calculations'
import { getMyReview } from '@/APIServices/Books/booksAPI'
import { MdOutlineStar } from 'react-icons/md'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const OrderItem = ({item, show}) => {
    const navigate = useNavigate();
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const review = await getMyReview(item._id);   
                setReview(review);
            } catch (error) {
                console.error('Error fetching review:', error);
            }
        };

        fetchReview();
    }, []);

    return (
        <div className='w-full grid-cols-2 gap-2 shadow-md rounded-md p-3 bg-background border border-divider-color flex justify-between'>
            <div className='flex gap-3'>
                <div className=''>
                    <img
                        className='book object-contain rounded-md w-[6rem] h-[8rem]'
                        src={item.image}
                    />
                </div>
                <div className='flex flex-col gap-2 text-primary'>
                    <p>{item.title}</p>
                    <p>{item.author}</p>
                    <div className='text-sm flex gap-3'>
                        <p className='font-semibold text-primary'>${calculateDiscountedPrice(item.price, item.discount)}</p>
                        {show &&
                            <>
                            <p className='line-through text-primary opacity-50'>$10</p>
                            <p className='font-semibold text-btn-secondary'>20% off</p>
                            </>
                        }
                    </div>
                    <p className='w-[5rem] flex justify-center bg-btn-secondary bg-opacity-35 p-1 text-xs mt-2 rounded-xl'>Paperback</p>
                </div>
            </div>
            {!show && 
                <div className='flex gap-2 text-primary items-center pr-5'>
                    {review ? (
                        <div className=' flex flex-col gap-2 text-primary'>
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <MdOutlineStar
                                    key={rating}
                                    className={classNames(
                                    review.rating > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-40',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ) : (
                        <>
                            <StarIcon className='w-4 h-4 mt-1'/>
                            <p onClick={() => navigate(`/book/${item._id}`)} >Rate & Review Book</p>
                        </>
                    )}
                </div>
            }
        </div>
    )
}

export default OrderItem