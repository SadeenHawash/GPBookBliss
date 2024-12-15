import React from 'react'
import CreatePostBody from '../../../../components/Profile/MyPostsBody/Posts/CreatePost/CreatePostBody'
import PrivateNavbar from '../../../../components/Navbar/PrivateNavbar/PrivateNavbar'

export default function CreatePost () {
    return (
        <div>
            <PrivateNavbar/>
            <CreatePostBody/>
        </div>
    )
}


