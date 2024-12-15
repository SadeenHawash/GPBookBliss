import { getAllBooksAPI, getAllBooksFilterAPI } from '@/APIServices/Books/booksAPI';
import { fetchGenresAPI } from '@/APIServices/categories/categoriesAPI';
import { faAngleDown, faAngleLeft, faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineStar } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BookCard from '../Home/BookCard';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const filters = [
    {
        id: 'rating',
        name: 'Rating',
        options: [
            { value: 5, label: <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <MdOutlineStar
                                                key={rating}
                                                className={classNames(
                                                    5 > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-40',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                                />
                                            ))}
                                            </div> },
            { value: 4, label: <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <MdOutlineStar
                                                key={rating}
                                                className={classNames(
                                                    4 > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-40',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                                />
                                            ))}
                                            </div> },
            { value: 3, label: <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <MdOutlineStar
                                                    key={rating}
                                                    className={classNames(
                                                        3 > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-40',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                    />
                                                ))}
                                                </div> },
            { value: 2, label: <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <MdOutlineStar
                                                key={rating}
                                                className={classNames(
                                                    2 > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-40',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                                />
                                            ))}
                                            </div> },
            { value: 1, label: <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <MdOutlineStar
                                                key={rating}
                                                className={classNames(
                                                    1 > rating ? 'text-yellow-500' : 'text-btn-secondary text-opacity-40',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                                />
                                            ))}
                                            </div> },
        ],
    },
    {
        id: 'price',
        name: 'Price',
        options: [
            { value: 10, label: '$10 And Above' },
            { value: 20, label: '$20 And Above' },
            { value: 30, label: '$30 And Above' },
            { value: 40, label: '$40 And Above' },
            { value: 50, label: '$50 And Above' },
            { value: 60, label: '$60 And Above' },
        ]
    },
    {
        id: 'pages',
        name: 'Number Of Pages',
        options: [
            { value: 100, label: '100 And Above' },
            { value: 200, label: '200 And Above' },
            { value: 300, label: '300 And Above' },
            { value: 400, label: '400 And Above' },
            { value: 500, label: '500 And Above' },
            { value: 600 , label: '600 And Above' },
            { value: 700 , label: '700 And Above' },
        ]
    },
    {
        id: 'discount',
        name: 'Discount Range',
        options: [
            { value: 1, label: '1% And Above' },
            { value: 2, label: '2% And Above' },
            { value: 3, label: '3% And Above' },
            { value: 4, label: '4% And Above' },
            { value: 5, label: '5% And Above' },
            { value: 6, label: '6% And Above' },
            { value: 7, label: '7% And Above' },
            { value: 8, label: '8% And Above' },
            { value: 9, label: '9% And Above' },
            { value: 10, label: '10% And Above'}
        ]
    },
];

const FiltersNav = () => {
    const navHeaders = ['Everything', 'Ebooks', 'Audiobooks'];
    const navEndpoints = ['category', 'Ebooks', 'Audiobooks'];
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const navContainerRef = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loadingGenres, setLoadingGenres] = useState(true); // State to track loading

    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getAllBooksAPI(); // Call your API function here
                setBooksData(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genresData = await fetchGenresAPI();
                console.log('Fetched genres:', genresData); // Add this line
                setGenres(genresData);
                setLoadingGenres(false); // Set loading to false after fetching genres
            } catch (error) {
                console.error('Error fetching genres:', error);
                setLoadingGenres(false); // Ensure loading is false in case of error
            }
        };
        

        fetchGenres();
    }, []);

    // Function to scroll navigation container
    const scrollNav = (direction) => {
        const navContainer = navContainerRef.current;
        const scrollAmount = 100;
        const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;
        navContainer.scrollLeft += scrollDirection;
    };

    // Check if scroll buttons should be displayed based on container scroll position
    const checkScroll = () => {
        const navContainer = navContainerRef.current;
        setShowLeftButton(navContainer.scrollLeft > 0);
    };

    // Effect to handle resizing of the window and updating scroll button visibility
    useEffect(() => {
        const handleResize = () => {
            const navContainer = navContainerRef.current;
            setShowScrollButton(navContainer.scrollWidth > navContainer.clientWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Effect to add scroll event listener to navigation container
    useEffect(() => {
        const navContainer = navContainerRef.current;
        navContainer.addEventListener('scroll', checkScroll);

        return () => {
            navContainer.removeEventListener('scroll', checkScroll);
        };
    }, []);

    // Effect to initialize selected filters from URL query parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const initialFilters = {};

        filters.forEach(filter => {
            const filterValue = searchParams.get(filter.id);
            initialFilters[filter.id] = filterValue ? filterValue : '';
        });

        setSelectedFilters(initialFilters);
    }, [location.search]);

    // Function to handle radio filter changes
    const handleRadioFilterChange = (e, filterId) => {
        const value = e.target.value;
        setSelectedFilters({
            ...selectedFilters,
            [filterId]: value,
        });

        const searchParams = new URLSearchParams(location.search);
        searchParams.set(filterId, value);
        navigate(`?${searchParams.toString()}`);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        // Set initial selected categories from query params
        const initialCategories = searchParams.getAll('category');
        setSelectedCategories(initialCategories);
    }, [location.search]);

    // Function to handle category checkbox change
    const handleCategoryCheckboxChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        let updatedCategories = [...selectedCategories];

        // Update selected categories array based on checkbox state
        if (isChecked && !updatedCategories.includes(value)) {
            updatedCategories.push(value);
        } else {
            updatedCategories = updatedCategories.filter((category) => category !== value);
        }

        setSelectedCategories(updatedCategories);

        // Update query params
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('category'); // Remove existing category params

        updatedCategories.forEach((category) => {
            searchParams.append('category', category); // Add updated categories to query params
        });

        navigate(`?${searchParams.toString()}`); // Navigate with updated query params
    };
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const booksData = await getAllBooksFilterAPI(searchParams.toString());
                setBooksData(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [location.search]);


    // Function to handle form submission on search
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?search=${encodeURIComponent(searchQuery)}`); // Navigate to search results page with query
    };

    const handleClearAll = () => {
        setSearchText('');
        setAuthorFilter('');
        setPriceFilter('');
        setRatingFilter('');
        setCategoryFilter('');
        setDiscountFilter('');
        setPagesFilter('');
        navigate(`/search?`);
    };

    return (
        <div className='flex flex-col max-w-7xl'>
            <nav className="mx-auto w-full px-1">
                <div className='border-b border-divider-color'>
                    <div className="flex gap-4 h-14 items-center">
                        <button
                            className={`text-primary font-semibold text-sm sm:text-sm focus:outline-none absolute left-3 w-6 h-6 rounded-3xl bg-btn-secondary bg-opacity-30 z-2 ${showLeftButton ? 'visible' : 'invisible'}`}
                            onClick={() => scrollNav('left')}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div ref={navContainerRef} className="ml-2 flex lg:ml-0 overflow-x-hidden whitespace-nowrap relative">
                            {navHeaders.map((navheader, index) => (
                                <Link
                                    key={index}
                                    to={`/${navEndpoints[index]}`}
                                    className={`text-primary font-thin text-sm mr-7 hover:text-hover-color bg-btn-secondary bg-opacity-0 rounded-full p-2 pr-3 pl-3 ${index === 0 ? 'bg-opacity-40' : ''}`}
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
            <nav className="mx-auto w-full px-1">
                <div className='flex flex-1 relative'>
                    <div className="flex h-14 items-center">
                        <button
                            className={`text-primary font-semibold text-sm sm:text-sm focus:outline-none absolute left-3 w-6 h-6 rounded-3xl bg-btn-secondary bg-opacity-30 z-2 ${showLeftButton ? 'visible' : 'invisible'}`}
                            onClick={() => scrollNav('left')}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div ref={navContainerRef} className='flex gap-2'>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className='group inline-flex justify-center items-center gap-2 text-primary font-thin text-sm hover:text-hover-color rounded-full border border-primary p-1 px-3'>
                                        Category
                                        <FontAwesomeIcon icon={faAngleDown}
                                            className="w-3 h-3 flex-shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute left-0 z-10 mt-2 w-44 max-h-48 overflow-y-auto origin-top-right rounded-lg bg-background shadow-2xl ring-1 ring-divider-color focus:outline-none">
                                        {loadingGenres ? (
                                            <div className="py-2 px-4 text-primary">Loading genres...</div>
                                        ) : (
                                            genres?.map((genre) => (
                                                <div key={genre.value} className="py-1 px-4 text-primary">
                                                    <input
                                                        type="checkbox"
                                                        className="h-3 w-3 border border-primary rounded-xl text-primary focus:bg-primary"
                                                        checked={selectedCategories.includes(genre.value)}
                                                        onChange={handleCategoryCheckboxChange}
                                                        value={genre.value}
                                                    />
                                                    <label
                                                        htmlFor={genre.value}
                                                        className="ml-3 text-sm min-w-0 flex-1 text-primary"
                                                    >
                                                        {genre.label}
                                                    </label>
                                                </div>
                                            ))
                                        )}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            {filters.map((filter) => (
                                <Menu as="div" className="relative inline-block text-left" key={filter.id}>
                                    <div>
                                        <Menu.Button key={filter.id} className='group inline-flex justify-center items-center gap-2 text-primary font-thin text-sm hover:text-hover-color rounded-full border border-primary p-1 px-3'>
                                            {filter.name}
                                            <FontAwesomeIcon icon={faAngleDown}
                                                className="w-3 h-3 flex-shrink-0 text-primary"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute left-0 z-10 mt-2 w-44 max-h-48 overflow-y-auto origin-top-right rounded-lg bg-background shadow-2xl ring-1 ring-divider-color focus:outline-none">
                                            <div className="py-1 px-4">
                                                <FormControl>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name={filter.id}
                                                        value={selectedFilters[filter.id] || ''}
                                                        onChange={(e) => handleRadioFilterChange(e, filter.id)}
                                                        sx={{ color: '#6F4E37', fontWeight: 'bold' }}
                                                    >
                                                        {filter.options.map((option) => (
                                                            <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} sx={{ color: 'primary' }} />
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ))}
                            <div className=' border-l border-divider-color py-1 mx-2'>
                                <button onClick={handleClearAll} className="text-primary ml-3">
                                    Clear all
                                </button>
                            </div>
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
                    <form onSubmit={handleSearchSubmit} className="mx-auto w-full px-1 absolute left-[80%] mt-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search books..."
                            className="relative border h-10 border-primary text-primary bg-transparent rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-btn-secondary"
                        />
                        <button type="submit" className="absolute left-[12%] ml-2 px-4 py-2 bg-transparent border-none text-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>
            </nav>
            <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    { booksData?.length === 0 ? 
                        <div className='flex flex-col gap-2 justify-center w-screen h-2/5 p-24 pt-32 items-center text-primary font-bold'>
                            <p className='text-2xl'>We couldn't find what you're looking for...</p>
                            <p className='text-lg font-normal'>Please try searching for another interest.</p>
                        </div>
                    : 
                        booksData?.map((book) => (
                            <BookCard key={book._id} val={false} book={book}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default FiltersNav;
