import React from 'react'
import { Link } from 'react-router-dom'

const BookshelfCard = ({bookshelf, numBooks, images, link}) => {
    return (
        <Link to={link}>
        <div className="bg-background-secondary bg-opacity-10 border border-btn-secondary hover:border-primary transition duration-200 rounded-2xl h-full ">
            <div className="relative" style={{ height: 100 }}>
                {images.length > 0 ? (
                    <div className={`absolute inset-0 overflow-hidden grid grid-cols-${Math.min(images.length, 3)} rounded-tl-2xl rounded-tr-2xl bg-white`}>
                        {images.slice(0, 3).map((image, index) => (
                            <div key={index} className="relative w-full aspect-w-1 aspect-h-1">
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className='absolute inset-0 w-full h-full object-cover'
                                />
                            </div>
                        ))}
                    </div>
                    ) : (
                        <div className='absolute inset-0 rounded-tl-2xl rounded-tr-2xl bg-btn-secondary bg-opacity-10' />
                    )}
            </div>
            <div className='p-3'>
                <div className="px-4">
                    <div className="mb-2 text-primary">
                        {bookshelf}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <p className="text-btn-secondary text-sm">
                            {numBooks} titles
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
    )
}

export default BookshelfCard