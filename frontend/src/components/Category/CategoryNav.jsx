import { faAngleDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Dialog } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { FaFunnelDollar } from 'react-icons/fa';
import { FaAngleDown, FaXmark } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CategoryNav = () => {
    const sortOptions = [
        { name: 'Most Popular', href: '#', current: true },
        { name: 'Best Rating', href: '#', current: false },
        { name: 'Newest', href: '#', current: false },
        { name: 'Price: Low to High', href: '#', current: false },
        { name: 'Price: High to Low', href: '#', current: false },
    ]
    const filters = [
        {
            id: 'color',
            name: 'Color',
            options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
            ],
        },
        {
            id: 'category',
            name: 'Category',
            options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
            ],
        },
        {
            id: 'size',
            name: 'Size',
            options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
            ],
        },
    ]
    const navHeaders = ['Everything', 'Ebooks', 'Audiobooks'];
    const navEndpoints = ['category', 'Ebooks', 'Audiobooks'];
    //const{authUser} = useAuthContext();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
            {/* Mobile filter dialog */}
            <Transition show={mobileFiltersOpen}>
            <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <Transition.Child
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-background py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                        {/* <h2 className="text-md font-medium text-primary">Filters</h2> */}
                        <button
                        type="button"
                        className="-mr-2 flex h-7 w-7 items-center justify-center rounded-md bg-transparent p-2 text-primary"
                        onClick={() => setMobileFiltersOpen(false)}
                        >
                        <span className="sr-only">Close menu</span>
                        <FaXmark className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4">

                        {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="px-4 py-6">
                            {({ open }) => (
                            <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 text-primary hover:text-primary">
                                    <span className="font-normal text-primary">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                    {open ? (
                                        <FaMinus className="h-4 w-4" aria-hidden="true" />
                                    ) : (
                                        <FaPlus className="h-4 w-4" aria-hidden="true" />
                                    )}
                                    </span>
                                </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                    {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded bg-transparent border-primary text-primary focus:ring-primary"
                                        />
                                        <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-primary"
                                        >
                                        {option.label}
                                        </label>
                                    </div>
                                    ))}
                                </div>
                                </Disclosure.Panel>
                            </>
                            )}
                        </Disclosure>
                        ))}
                    </form>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </Dialog>
            </Transition>
            <div className='flex-col'>
                <nav className="mx-auto max-w-7xl px-1">
                    <div className="border-b border-divider-color">
                        <div className="flex justify-between h-16 items-center">
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
                                        to={`/${navEndpoints[index]}`}
                                        className={`text-primary font-thin text-sm mr-7 hover:text-hover-color bg-btn-secondary bg-opacity-0 rounded-full p-2 pr-3 pl-3 ${location.pathname === `/${navEndpoints[index]}` ? 'bg-opacity-40' : ''}`}
                                    >{navheader}</Link>
                                ))}
                            </div>
                            {/* <div className='text-primary flex gap-2'>
                                Sort
                                <FontAwesomeIcon icon={faAngleDown}
                                className="h-3 w-3 pt-2 flex-shrink-0 text-primary"
                                aria-hidden="true"
                                />
                            </div> */}
                            <Menu as="div" className="hidden relative sm:inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-primary">
                                        Sort
                                        <FaAngleDown
                                        className="-mr-1 ml-1 h-4 w-4 mt-[2px] flex-shrink-0 text-primary"
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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-background shadow-2xl ring-1 ring-divider-color focus:outline-none">
                                    <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.name}>
                                        {({ focus }) => (
                                            <a
                                            href={option.href}
                                            className={classNames(
                                                option.current ? 'text-primary ' : 'font-medium text-btn-secondary',
                                                focus ? ' bg-btn-secondary bg-opacity-10' : '',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            >
                                            {option.name}
                                            </a>
                                        )}
                                        </Menu.Item>
                                    ))}
                                    </div>
                                </Menu.Items>
                                </Transition>
                            </Menu>
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
                <div className='sm:hidden px-6 my-4 flex justify-center gap-10'>
                    {/* <p className='flex gap-2 text-primary'>
                        <p>Filters</p>
                        <FaFunnelDollar className='w-4 h-4 mt-2'/>
                    </p> */}
                    <button
                        type="button"
                        className="-m-2 p-2 flex gap-2 text-primary sm:ml-6 lg:hidden"
                    >
                        <span className="sr-only">Filters</span>
                        Filters
                        <FaFunnelDollar 
                            className="h-4 w-4 mt-2" aria-hidden="true" 
                            onClick={() => setMobileFiltersOpen(true)}
                        />
                    </button>
                    <Menu as="div" className="sm:hidden relative inline-block text-left">
                        <div>
                            <Menu.Button className="group inline-flex justify-center text-primary">
                                Sort
                                <FaAngleDown
                                    className="-mr-1 ml-1 h-4 w-4 mt-1 flex-shrink-0 text-primary"
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-background shadow-2xl ring-1 ring-divider-color focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.name}>
                                        {({ focus }) => (
                                            <a
                                            href={option.href}
                                            className={classNames(
                                                option.current ? 'text-primary' : 'font-medium text-btn-secondary',
                                                focus ? ' bg-btn-secondary bg-opacity-50' : '',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            >
                                            {option.name}
                                            </a>
                                        )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default CategoryNav