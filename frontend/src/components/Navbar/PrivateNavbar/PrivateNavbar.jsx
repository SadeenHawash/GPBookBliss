import React from 'react'
import { useAuthContext } from '../../../context/authContext'

import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBagShopping,faBarsStaggered, faMagnifyingGlass, faBell, faMessage, faUser, faBookmark} from '@fortawesome/free-solid-svg-icons'
import SignoutButton from './SignoutButton'
import { useChatContext } from '../../../context/chatContext'
import { useOrderContext } from '@/context/orderContext'
import { Box, IconButton, InputBase } from '@mui/material'
import { styled } from '@mui/system';
import useAuthUser from '@/hooks/authentication/useAuthUser'


const navigation = {
    categories: [
        {
        name: 'Ebooks',
        featured: [
            {
            href: '#',
            imageSrc: 'https://imgv2-1-f.scribdassets.com/img/word_document/623632583/original/432x574/b763cdafda/1713610726?v=1',
            imageAlt: 'Maybe You Should Talk To Someone',
            },
            {
            href: '#',
            imageSrc: 'https://imgv2-2-f.scribdassets.com/img/word_document/318239233/original/432x574/f65bd1f203/1711979123?v=1',
            imageAlt: 'It Ends With Us',
            },
        ],
        sections: [
            {
            items: [
                { name: 'Action & Adventure Fiction', href: '#' },
                { name: 'Art', href: '#' },
                { name: 'Biography & Memoir', href: '#' },
                { name: 'Computers', href: '#' },
                { name: 'Comics & Graphic Novels', href: '#' },
                { name: 'Cooking, Food', href: '#' },
                { name: 'Finance & Money Management', href: '#' },
                { name: 'Games & Activities', href: '#' },
            ],
            },
            {
            items: [
                { name: 'History', href: '#' },
                { name: 'Horror Fiction', href: '#' },
                { name: 'Law', href: '#' },
                { name: 'Mystery, Thriller & Crime Fiction', href: '#' },
                { name: 'News', href: '#' },
                { name: 'Philosophy', href: '#' },
            ],
            },
            {
            items: [
                { name: 'Religion & Spirituality', href: '#' },
                { name: 'Romance', href: '#' },
                { name: 'Self-Improvement', href: '#' },
                { name: 'Sports & Recreation', href: '#' },
                { name: 'Technology & Engineering', href: '#' },
            ],
            },
        ],
        },
        {
        name: 'Audiobooks',
        featured: [
            {
            href: '#',
            imageSrc: 'https://imgv2-2-f.scribdassets.com/img/audiobook_square_badge/665062199/original/432x432/22a612ea13/1710288047?v=1',
            imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
            },
            {
            href: '#',
            imageSrc: 'https://imgv2-2-f.scribdassets.com/img/audiobook_square_badge/629938767/396x396/98e03b3ade/1712250303?v=1',
            imageAlt:
                'The Subtle Art of Not Giving a F*ck',
            },
        ],
        sections: [
            {
            items: [
                { name: 'Action & Adventure Fiction', href: '#' },
                { name: 'Art', href: '#' },
                { name: 'Biography & Memoir', href: '#' },
                { name: 'Computers', href: '#' },
                { name: 'Comics & Graphic Novels', href: '#' },
                { name: 'Cooking, Food', href: '#' },
                { name: 'Finance & Money Management', href: '#' },
                { name: 'Games & Activities', href: '#' },
            ],
            },
            {
            items: [
                { name: 'History', href: '#' },
                { name: 'Horror Fiction', href: '#' },
                { name: 'Law', href: '#' },
                { name: 'Mystery, Thriller & Crime Fiction', href: '#' },
                { name: 'News', href: '#' },
                { name: 'Philosophy', href: '#' },
            ],
        },
        {
            items: [
                { name: 'Religion & Spirituality', href: '#' },
                { name: 'Romance', href: '#' },
                { name: 'Self-Improvement', href: '#' },
                { name: 'Sports & Recreation', href: '#' },
                { name: 'Technology & Engineering', href: '#' },
            ],
        },
        ],
        },
    ],
    pages: [
        {  name: 'Contact', href: '#' },
        { name: 'Blog', href: '/blog' },
    ],
}

const SearchInputWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: `1px solid #6f4e37`,
    borderRadius: '1.5rem',
    padding: '0.25rem 0.75rem',
    backgroundColor: 'transparent',
    '&:hover': {
        borderColor: '#6f4e37',
    },
    '& .MuiInputBase-input': {
        color: '#6f4e37',
        fontSize: '0.875rem',
    },
    '& .MuiInputBase-root': {
        flex: 1,
        width: '12rem',
    },
    '& .MuiIconButton-root': {
        color: '#6f4e37',
        fontSize: '1.1rem',
    },
}));

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PrivateNavbar({ onSearch }) {
    const {authUser} = useAuthUser();
    const {notification} = useChatContext();
    const [open, setOpen] = useState(false);
    const counter = 3;
    const navigate = useNavigate();
    const { cartItems } = useOrderContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleIconClick = () => {
        setShowInput(!showInput);
    };

    const handleSearch = () => {
        onSearch(searchQuery); // Pass searchQuery to parent component
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const Links = (
        <Fragment>
                    {/* Search */}
                    <Box className="flex mx-2 pr-1 mt-2 border-r border-divider-color" position="relative">
                    <IconButton onClick={() => navigate('/search')} className="p-2 text-primary hover:text-primary">
                        <span className="sr-only">Search</span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className=" text-[1.2rem] text-primary" aria-hidden="true" />
                    </IconButton>
                    {/* {showInput && (
                        <SearchInputWrapper>
                        <InputBase
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <IconButton onClick={handleSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </IconButton>
                        </SearchInputWrapper>
                    )} */}
                    </Box>

                    {/* Notification */}
                    <div className="ml-1 flow-root mt-1">
                    <a href="#" className="group -m-2 flex items-center p-2">
                        <FontAwesomeIcon icon={faBell}
                        className="h-5 w-5 flex-shrink-0 text-primary group-hover:text-primary"
                        aria-hidden="true"
                        />
                        {/* {notificationCount > 0 (
                            <span className="ml-1 text-sm font-medium text-primary group-hover:text-primary">{notificationCount}</span>
                        )} */}
                        {counter > 0 && <span className="mb-5 text-xs font-semibold text-primary group-hover:text-primary">{counter}</span> }
                        <span className="sr-only">notifications</span>
                    </a>
                    </div>

                    {/* Chat */}
                    <div className="ml-1.5 flow-root mt-2">
                    <Link to='/chatting' className="group -m-2 flex items-center p-2">
                        <FontAwesomeIcon icon={faMessage}
                        className="h-4 w-4 flex-shrink-0 text-primary group-hover:text-primary"
                        aria-hidden="true"
                        />
                        { notification.length > 0 && <span className="mb-6 ml-0.5 text-xs font-semibold text-primary group-hover:text-primary">{notification.length}</span>}
                        <span className="sr-only">messages</span>
                    </Link>
                    </div> 

                    {/* Cart */}
                    <div className="ml-1.5 flow-root mt-1">
                    <Link to='/cart' className="group -m-2 flex items-center p-2">
                        <FontAwesomeIcon icon={faBagShopping}
                        className="h-5 w-5 flex-shrink-0 text-primary group-hover:text-primary"
                        aria-hidden="true"
                        />
                        {cartItems.length > 0 && <span className="mb-5 text-xs font-semibold text-primary group-hover:text-primary">{cartItems.length}</span>}
                        <span className="sr-only">items in cart, view bag</span>
                    </Link>
                    </div>
                    <div className="dropdown dropdown-end">
                        <img tabIndex={0} role="button"
                            className="inline-block h-10 w-10 ml-3 mt-1 rounded-full ring-primary"
                            src={authUser?.profilePic}
                            alt=""
                        />
                        <ul tabIndex={0} className="box text-primary font-normal mt-3 p-5 dropdown-content z-10 menu bg-background rounded-box w-52">
                            <div className='flex flex-col gap-3 items-center text-lg pb-2 mb-1'>
                                <div>
                                <img tabIndex={0} role="button"
                                    className="inline-block h-14 w-14 mt-1 rounded-full ring-primary"
                                    src={authUser?.profilePic}
                                    alt=""
                                    />
                                </div>
                                <div>
                                    {authUser?.fullName}
                                </div>
                            </div>
                            <li className='pb-1'>
                                <div>
                                    <FontAwesomeIcon icon={faBookmark}
                                    className="h-4 w-4 flex-shrink-0 text-primary group-hover:text-primary"
                                    aria-hidden="true"
                                    />
                                    <Link to='/'>Saved</Link>
                                </div>
                            </li>
                            <li className='pb-1'>
                                <div>
                                    <FontAwesomeIcon icon={faUser}
                                    className="h-4 w-4 flex-shrink-0 text-primary group-hover:text-primary"
                                    aria-hidden="true"
                                    />
                                    <Link to='/profile'>Profile</Link>
                                </div>
                            </li>
                            <li className='border-t border-divider-color py-2'>
                                <SignoutButton/>
                            </li>
                        </ul>
                    </div>
                    
        </Fragment>
    );

    const handleCatecoryClick = (category, section, item, close) => {
        navigate(`/category/${category}/${section}/${item}`);
        close();
    }

    return (
        <div>
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray bg-opacity-10" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                >
                <Dialog.Panel className="relative flex w-full max-w-72 flex-col overflow-y-auto bg-background pb-12 shadow-xl">
                    <div className="flex px-4 pb-2 pt-5">
                    <button
                        type="button"
                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-primary"
                        onClick={() => setOpen(false)}
                    >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close menu</span>
                        <FontAwesomeIcon icon={faXmark} className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </div>

                     {/* Logo */}
                    <div className="flex mt-2 justify-center">
                    <Link to='/' className='text-primary font-semibold tracking-widest text-2xl mr-10 sm:text-2xl'>BookBliss</Link>
                    </div>

                    {/* Links */}
                    <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-btn-secondary border-opacity-40 text-btn-secondary">
                        <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category, index) => (
                            <Tab
                            key={index}
                            className={({ selected }) =>
                                classNames(
                                selected ? 'border-primary text-primary' : 'border-transparent',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                )
                            }
                            >
                            {category.name}
                            </Tab>
                        ))}
                        </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                        {navigation.categories.map((category) => (
                        <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                            <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item, index) => (
                                <div key={index} className="group relative text-sm">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                    <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                </div>
                                <a href={item.href} className="mt-6 block font-medium text-primary">
                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                    {item.name}
                                </a>
                                </div>
                            ))}
                            </div>
                            {category.sections.map((section, index) => (
                            <div key={index}>
                                <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                {section.name}
                                </p>
                                <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-5 flex flex-col space-y-6"
                                >
                                {section.items.map((item, index) => (
                                    <li key={index} className="flow-root">
                                    <a href={item.href} className="-m-2 block p-2 text-btn-secondary ">
                                        {item.name}
                                    </a>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            ))}
                        </Tab.Panel>
                        ))}
                    </Tab.Panels>
                    </Tab.Group>

                    <div className="space-y-6 border-t border-btn-secondary border-opacity-40 px-4 py-6">
                    {navigation.pages.map((page) => (
                        <div key={page.name} className="flow-root">
                        <a href={page.href} className="-m-2 block p-2 font-medium text-primary">
                            {page.name}
                        </a>
                        </div>
                    ))}
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition.Root>
        <header className="fixed top-0 left-0 w-full z-10 bg-background">

            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-divider-color">
                <div className="flex h-16 items-center">
                <button
                    type="button"
                    className="relative rounded-md bg-background p-2 text-primary lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    <FontAwesomeIcon icon={faBarsStaggered} className="h-6 w-6 mt-2" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="hidden lg:ml-0 lg:block">
                    <Link to='/' className='text-primary font-semibold tracking-widest text-2xl mr-10 sm:text-2xl'>BookBliss</Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden mt-2 lg:ml-6 lg:block lg:self-stretch">
                    <div className="flex h-full space-x-8 text-2xl">
                    {navigation.categories.map((category, index) => (
                        <Popover key={index} className="flex">
                        {({ open }) => (
                            <>
                            <div key={index} className="relative flex">
                                <Popover.Button
                                className={classNames(
                                    open
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-primary text-md font-semibold hover:text-hover-color',
                                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-semibold transition-colors duration-200 ease-out'
                                )}
                                >
                                {category.name}
                                </Popover.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-primary">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                <div className="relative shadow-md bg-clip-padding backdrop-filter backdrop-blur-md backdrop-brightness-30 bg-background bg-opacity-30 text-primary">
                                    <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item, index) => (
                                            <div key={index} className="group relative text-base sm:text-sm">
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center"
                                                />
                                            </div>
                                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                {item.name}
                                            </a>
                                            </div>
                                        ))}
                                        </div>
                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                        {category.sections.map((section, index) => (
                                            <div key={index}>
                                            <p id={`${index}-heading`} className="font-medium text-gray-900">
                                                {section.name}
                                            </p>
                                            <ul
                                                role="list"
                                                aria-labelledby={`${index}-heading`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                                {section.items.map((item, index) => (
                                                <li key={index} className="flex">
                                                    <p
                                                        onClick={() => 
                                                            handleCatecoryClick(
                                                                category,
                                                                section,
                                                                item,
                                                                close
                                                            )
                                                        }
                                                        className="hover:text-primary cursor-pointer">
                                                    {item.name}
                                                    </p>
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </Popover.Panel>
                            </Transition>
                            </>
                        )}
                        </Popover>
                    ))}

                    {navigation.pages.map((page, index) => (
                        <a
                        key={index}
                        href={page.href}
                        className="flex items-center text-sm font-semibold text-primary hover:text-hover-color"
                        >
                        {page.name}
                        </a>
                    ))}
                    </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                    {Links}
                </div>
                </div>
            </div>
            </nav>
            {/* <div className='p-3 flex justify-center items-center'>
                <input className='input w-1/3 rounded-3xl input-bordered h-9 focus:border-teal-500 hover:border-teal-500 text-teal-600 bg-transparent'
                    type='text' placeholder='search' />
            </div> */}
        </header>
        </div>
    )
}



