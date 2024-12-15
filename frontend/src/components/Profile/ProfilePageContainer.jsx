import React from 'react'
import GridBookshelves from './BookshelvesBody/GridBookshelves'
import UserSection from './UserSection'
import ProfileNav from './ProfileNav'
import BookshelvesShow from './BookshelvesBody/BookshelvesShow'
import Footer from '../Footer/Footer'

const ProfilePageContainer = () => {
    //const { isGridView, showGridBookshelves, showListBookshelves } = useBookshelfToggle();
    return (
        <div className='flex flex-col absolute left-0 w-full z-1 py-3 sm:px-9 bg-background'>
            <UserSection/>
            <ProfileNav />
            <BookshelvesShow />
            <GridBookshelves />
            <Footer />
        </div>
    )
}

export default ProfilePageContainer