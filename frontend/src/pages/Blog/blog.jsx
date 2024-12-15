import React from 'react'
import ListAllPosts from '../../components/Profile/MyPostsBody/Posts/ListAllPosts';
import PrivateNavbar from '../../components/Navbar/PrivateNavbar/PrivateNavbar';

export default function Blog () {
	return (
        <div>
            <PrivateNavbar/>
            <ListAllPosts/>
        </div>
	);
}
