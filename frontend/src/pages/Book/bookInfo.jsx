import BookInfoContainer from '@/components/Book/BookInfoPage/BookInfoContainer'
import PrivateNavbar from '@/components/Navbar/PrivateNavbar/PrivateNavbar'
import React from 'react'

export default function BookInfo () {
    return (
        <div className='w-screen bg-background'>
            <PrivateNavbar/>
            <BookInfoContainer/>
        </div>
    )
}
