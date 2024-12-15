import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../context/authContext';

const ProfileNav = () => {
    const navHeaders = ['Bookshelves', 'My Books', 'My Posts', 'Liked Posts', 'Orders', 'About'];
    const navEndpoints = ['bookshelves', 'mybooks', 'my-posts', 'liked-posts', 'orders', 'about'];
    const{authUser} = useAuthContext();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const location = useLocation();
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
            <nav className="mx-auto max-w-7xl px-1">
                <div className="border-b border-divider-color">
                <div className="flex h-16 items-center">
                    <button
                    className={`text-primary font-semibold text-sm sm:text-sm focus:outline-none absolute left-3 w-6 h-6 rounded-3xl bg-btn-secondary bg-opacity-30 z-2 ${showLeftButton ? 'visible' : 'invisible'}`}
                    onClick={() => scrollNav('left')}
                    >
                    <FontAwesomeIcon icon={faAngleLeft}/>
                    </button>
                    <div ref={navContainerRef} className="ml-2 flex lg:ml-0 overflow-x-hidden whitespace-nowrap relative">
                        {navHeaders.map((navheader,index) => (
                            <Link
                                key={index}
                                to={`/profile/${navEndpoints[index]}`}
                                className={`text-primary font-thin text-sm mr-7 hover:text-hover-color bg-btn-secondary bg-opacity-0 rounded-full p-2 pr-3 pl-3 ${location.pathname === `/profile/${navEndpoints[index]}` ? 'bg-opacity-40' : ''}`}
                            >{navheader}</Link>
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
                </div>
            </nav>
        </div>
    );
};

export default ProfileNav;
