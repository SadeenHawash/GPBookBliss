import React from 'react'
import MyPostsContainer from '../../../../components/Profile/MyPostsBody/MyPostsContainer'
import PrivateNavbar from '../../../../components/Navbar/PrivateNavbar/PrivateNavbar'
export default function MyPosts() {
    return (
        <div >
            <PrivateNavbar />
            <MyPostsContainer />
        </div>
    )
}