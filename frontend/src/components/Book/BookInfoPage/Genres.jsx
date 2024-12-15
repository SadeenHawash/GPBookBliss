import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'

const Genres = ({data}) => {
    //const Genres = genres.map((book) => <BookCard key={book._id} book={book}  val={card} />)
    //const Genres = ['Fiction','Contemporary','New Adult','Contemporary Romance','Adult','Abuse','Chick Lit','Young Adult','Love'];
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const navContainerRef = useRef(null);

    // Function to scroll the navigation container
    const scrollNav = (direction) => {
        const navContainer = navContainerRef.current;
        const scrollAmount = 100; // Adjust this value according to your preference
        const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;
        navContainer.scrollLeft += scrollDirection;
    };

    // Check scroll position and toggle left button visibility
    const checkScroll = () => {
        const navContainer = navContainerRef.current;
        setShowLeftButton(navContainer.scrollLeft > 0);
    };

    // Check viewport width and toggle scroll button visibility
    useEffect(() => {
        const handleResize = () => {
        const navContainer = navContainerRef.current;
        setShowScrollButton(navContainer.scrollWidth > navContainer.clientWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const navContainer = navContainerRef.current;
        navContainer.addEventListener('scroll', checkScroll);

        return () => {
        navContainer.removeEventListener('scroll', checkScroll);
        };
    }, []);

    return (
        <div>
            <nav className="mx-auto max-w-7xl">
                <div className="flex h-16 items-center">
                    <button
                    className={`text-primary font-semibold text-sm sm:text-sm focus:outline-none absolute left-3 w-6 h-6 rounded-3xl bg-btn-secondary bg-opacity-30 z-2 ${showLeftButton ? 'visible' : 'invisible'}`}
                    onClick={() => scrollNav('left')}
                    >
                    <FontAwesomeIcon icon={faAngleLeft}/>
                    </button>
                    <div ref={navContainerRef} className="flex lg:ml-0 overflow-x-hidden whitespace-nowrap relative">
                        {data?.genres.map((genre,index) => (
                            <Link
                                key={index}
                                //to={`/${Genres[index]}`}
                                className={`text-primary font-thin text-xs hover:text-hover-color bg-btn-secondary bg-opacity-40 rounded-full p-2 px-3 mr-1`}
                            >{genre.name}</Link>
                        ))}
                    </div>
                    {showScrollButton && (
                    <button
                        className="text-primary font-semibold text-sm sm:text-sm focus:outline-none absolute right-5 w-6 h-6 rounded-3xl bg-btn-secondary bg-opacity-30 z-2"
                        onClick={() => scrollNav('right')}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Genres;
