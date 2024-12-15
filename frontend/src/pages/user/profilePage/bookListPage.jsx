import PrivateNavbar from '@/components/Navbar/PrivateNavbar/PrivateNavbar'
import BookListBody from '@/components/Profile/BookshelvesBody/BookList/BookListBody'
import React from 'react'

const BookListPage = () => {
    return (
        <div className='w-screen'>
            <PrivateNavbar/>
            <BookListBody/>
        </div>
    )
}

export default BookListPage