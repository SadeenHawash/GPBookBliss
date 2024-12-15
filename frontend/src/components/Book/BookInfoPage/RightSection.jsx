import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Genres from './Genres';
import { MdOutlineStar } from 'react-icons/md';
import { LinearProgress, Rating, Typography } from '@mui/material';
import { addReviewAPI } from '@/APIServices/Books/booksAPI';
import toast from 'react-hot-toast';
import { format, formatDistanceToNow } from 'date-fns';
import { calculateAverageRating, calculateDiscountedPrice, calculateRatingsBreakdown, formatDate } from '../calculations';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const RightSection = ({ data }) => {
    const reviews = data?.reviews || [];
    const discountedPrice = calculateDiscountedPrice(data?.price, data?.discount);
    const averageRating = calculateAverageRating(reviews);
    const ratingsBreakdown = calculateRatingsBreakdown(reviews);
    const ifSeries = true;
    const following = false;
    //rating 
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addReviewAPI(data?._id, { rating: value, comment: comment });

            toast.success('Review submitted successfully:', response);
            // Optionally update UI or show success message
        } catch (error) {
            toast.error('Error submitting review:', error);
            setError(error.response?.data?.message || 'Failed to submit review');
            // Handle error, show error message to user, etc.
        }
    };

    return (
        <div className='w-3/4 max-[900px]:w-full container flex flex-col'>
            <div className='flex flex-col gap-3 py-4 pb-6 border-b border-divider-color'>
                <div className='text-primary'>
                    <Link className={`${ifSeries ? 'block' : 'hidden'} text-lg font-medium text-btn-secondary`}>
                        {data?.title} #1
                    </Link>
                    <h1 className='text-3xl font-semibold'>
                        {data?.title}
                    </h1>
                </div>
                <div>
                    <p className='text-xl font-thin text-primary'>
                        {data?.author}
                    </p>
                </div>
                <div className="flex items-center gap-3 font-semibold"> 
                    <div className="flex items-center">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <MdOutlineStar
                                    key={rating}
                                    className={classNames(
                                        averageRating > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-40',
                                        'h-6 w-6 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="sr-only">{averageRating} out of 5 stars</p>
                        {data?.reviews.length > 0 &&
                        <a className="ml-3 text-lg font-bold text-primary">
                            {averageRating}
                        </a>
                        }
                    </div>
                    {data?.reviews.length > 0 &&
                    <Typography className="font-thin text-xs text-btn-secondary mt-4">
                        {reviews.length} reviews
                    </Typography>
                    }
                </div>
                <div className='text-sm flex gap-4 my-2'>
                    <p className='font-semibold text-2xl text-primary'>${discountedPrice}</p>
                    <p className='line-through text-2xl text-primary opacity-50'>${data?.price}</p>
                    <p className='font-semibold mt-1 text-xl text-btn-secondary'>{data?.discount}% off</p>
                </div>
                <div className='mt-2 gap-3 text-primary text-sm'
                    dangerouslySetInnerHTML={{
                        __html: data?.description,
                    }}
                />
                <Genres data={data} /> 
                <div className='flex flex-col gap-2 text-xs text-btn-secondary'>
                    <p>{data?.numberOfPages} pages, Kindle Edition </p>
                    <p>First published&nbsp;&nbsp;{formatDate(data?.publishedDate)}
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-3 py-3 border-b border-divider-color'>
                <div className='text-primary'>
                    <h1 className='text-xl font-thin'>
                        About the author
                    </h1>
                </div>
                <div className={`cursor-pointer`}>
                    <div className='relative flex items-center gap-4 max-[280px]:gap-3 py-2'>
                        <div className='avatar z-0'>
                            <div className='w-16 max-[280px]:w-14 rounded-full'>
                                <img 
                                    src='https://cdn.pixabay.com/photo/2015/10/09/00/55/lotus-978659_640.jpg'
                                    alt='user avatar' 
                                />
                            </div>
                        </div>
                        <div className='flex-col sm:inline-block'>
                            <div className='font-bold text-md text-primary min-[815px]:text-[18px]'>
                                {data?.author}
                            </div>
                            <div className='flex pt-1 gap-5 text-btn-secondary'>
                                <span className='text-sm ellipsis'>
                                    104 books
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-5 py-3 pb-5'>
                <div className='text-primary'>
                    <h1 className='text-xl font-thin'>
                        Ratings & Reviews
                    </h1>
                </div>
                {data?.reviews.length > 0 &&
                <div className='text-primary flex flex-col gap-3'>
                    <h1 className='text-lg font-thin'>
                    Community Reviews
                    </h1>
                    <div className="flex gap-3 font-semibold">
                        <h3 className="sr-only">Reviews</h3>
                        <div className="flex items-center">
                            <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <MdOutlineStar
                                key={rating}
                                className={classNames(
                                    averageRating > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-40',
                                    'h-6 w-6 flex-shrink-0'
                                )}
                                aria-hidden="true"
                                />
                            ))}
                            </div>
                            <p className="sr-only">{averageRating} out of 5 stars</p>
                            <a className="ml-3 text-lg font-bold text-primary">
                                {averageRating}
                            </a>
                        </div>
                        <Typography className="font-thin text-xs text-btn-secondary mt-1">
                            {reviews.length} reviews
                        </Typography>
                    </div>
                    <div className='flex flex-col gap-2 pl-1'>
                        {Object.entries(ratingsBreakdown).map(([star, { count, percentage }]) => (
                            <div key={star} className='flex gap-3'>
                                <p className='text-primary'>{star} stars</p>
                                <LinearProgress
                                    variant="determinate"
                                    value={percentage}
                                    sx={{ width: '60%', height: '25%' }}
                                    className='mt-3 rounded-lg'
                                />
                                {count > 0 && 
                                <p className='text-primary'>{count} ({percentage.toFixed(0)}%)</p>
                                }
                            </div>
                        ))}
                    </div>
                </div>
                }
                <div className={`${data?.reviews.length > 0 ? 'inline-block' : 'hidden'} container mt-5`}>
                    {data?.reviews.map((review) => (
                    <div className='flex gap-2'>
                        <div className='w-1/6 flex flex-col gap-2'>
                            <div className='avatar z-0'>
                                <div className='w-12 max-[280px]:w-8 rounded-full ring-0 ring-primary'>
                                    <img src='https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/users/1353371225i/5604583._UX200_CR0,42,200,200_.jpg'
                                    alt='user avatar' />
                                </div>
                            </div>
                            <p className='text-primary text-xs'>{review.userId.fullName}</p>
                            <button 
                                type="submit"
                                className={`w-[75px] p-1 px-2 rounded-full shadow-md text-xs ${following ? ' bg-transparent text-primary border border-primary' : ' bg-primary text-white' } `}
                            >
                                {following ? 
                                    <p>Following</p>
                                : 
                                    <p>Follow</p>
                                }
                            </button>
                        </div>
                        <div className='w-5/6 flex flex-col gap-5 pb-5 border-b border-divider-color'>
                            <div className='flex justify-between'>
                                {/* <Rating readonly className='text-yellow-500' value={rated} /> */}
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <MdOutlineStar
                                        key={rating}
                                        className={classNames(
                                            review.rating > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-35',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className='text-xs text-primary'>
                                        {new Date(review.createdAt).toDateString() === new Date().toDateString() ? 
                                        `${formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}`
                                        : `${format(new Date(review.createdAt), 'MMM d, yyyy')}`
                                        }
                                </p>
                            </div>
                            <div>
                                {/* "People spend so much time wondering why the women don't leave. Where are all the people who wonder why the men are even abusive? Isn't that where the only blame should be placed?" */}
                                <p className='text-sm text-primary'>{review.comment}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col bg-btn-secondary bg-opacity-15 p-10 py-8 rounded-lg'>
                    <div className='flex flex-col gap-3'>
                        <div className='text-primary'>
                            <h1 className='text-lg font-thin'>
                                What did you think?
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 font-semibold">
                            <Rating name='no-value' value={value} className='text-sm text-yellow-500'
                                onChange={(e) => setValue(parseInt(e.target.value))} required
                            />
                            <Typography className="font-thin text-xs text-primary">
                                Tap to rate
                            </Typography>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 mt-5'>
                        <div className='text-primary'>
                            <h1 className='text-lg font-thin'>
                                Write a review
                            </h1>
                            <p className="font-thin text-xs text-primary pt-1">
                                Review must be at least 10 words
                            </p>
                        </div>
                        <div>
                            <textarea
                                className='w-full h-32 p-2 bg-transparent border border-primary rounded-lg text-primary text-sm placeholder:text-sm placeholder:text-btn-secondary focus:outline-none'
                                placeholder='Tell others what you thought of this book'
                                value={comment} onChange={(e) => setComment(e.target.value)} required
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='flex justify-end'>
                        <button
                            type="submit"
                            className="py-2 px-6 w-1/5 border border-transparent rounded-full shadow-sm text-sm font-medium bg-primary text-btn-primary hover:bg-opacity-90 "
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default RightSection;
