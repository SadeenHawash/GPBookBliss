import React from 'react'
import PrivateNavbar from '../../../../components/Navbar/PrivateNavbar/PrivateNavbar'
import MyBooksContainer from '../../../../components/Profile/MyBooksBody/MyBooksContainer'
export default function MyBooks() {
    return (
        <div>
            <PrivateNavbar />
            <MyBooksContainer/>
        </div>
)
}