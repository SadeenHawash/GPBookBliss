import React from 'react'
import PrivateNavbar from '../../../components/Navbar/PrivateNavbar/PrivateNavbar'
import LikedPostsContainer from '../../../components/Profile/LikedPostsBody/LikedPostsContainer'
export default function LikedPosts() {
    return (
        <div >
            <PrivateNavbar />
            <LikedPostsContainer />
        </div>
    )
}