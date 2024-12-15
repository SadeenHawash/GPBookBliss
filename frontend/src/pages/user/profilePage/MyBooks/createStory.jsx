import React from 'react'
import PrivateNavbar from '../../../../components/Navbar/PrivateNavbar/PrivateNavbar'
import CreateStoryBody from '../../../../components/Profile/MyBooksBody/Stories/CreateStory/CreateStoryBody'

export default function CreateStory () {
    return (
        <div>
            <PrivateNavbar/>
            <CreateStoryBody/>
        </div>
    )
}