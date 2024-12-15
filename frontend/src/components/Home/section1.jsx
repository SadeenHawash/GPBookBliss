import React from 'react'

const Section1 = () => {
    return (
        //right-8
        <div className="relative w-screen mt-12 overflow-hidden bg-background">
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-28 lg:pb-52 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg text-center text-shadow">
                    <h1 className="text-3xl text-primary font-bold tracking-tight sm:text-5xl">
                        Read anywhere. Anytime.
                    </h1>
                    <p className="mt-4 text-xl text-btn-secondary">
                        Discover the best reads on various topics of
                        <br/> interest. Cancel anytime.
                    </p>
                    </div>
                    <div>
                    <div className="mt-10">
                        {/* Decorative image grid */}
                        <div
                        aria-hidden="true"
                        className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                        >
                        <div className="absolute transform sm:left-1/2 sm:top-0 sm:-translate-x-5 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-5">
                            <div className="flex items-center space-x-6 lg:space-x-8">
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 ">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1547189796i/37570546.jpg"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                                </div>
                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1695345972i/199070727.jpg"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                                </div>
                            </div>
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1440180557i/19202564.jpg"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                                </div>
                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1694742793i/58557356.jpg"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                                </div>
                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1678189908i/123198703.jpg"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                                </div>
                            </div>
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                    src='https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1422254856i/24693639.jpg'
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                                </div>
                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1644336652i/58214328.jpg"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
        
                        {/* <a
                        href="#"
                        className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                        >
                        Shop Collection
                        </a> */}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section1




