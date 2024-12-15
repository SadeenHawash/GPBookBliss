import React from 'react'
import PrivateNavbar from '../../../components/Navbar/PrivateNavbar/PrivateNavbar'
import BookshelvesContainer from '../../../components/Profile/BookshelvesBody/BookshelvesContainer'
export default function BookShelves() {
    return (
            <div>
                <PrivateNavbar />
                <BookshelvesContainer/>
            </div>
    )
}

