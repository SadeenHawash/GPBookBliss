import React from 'react'
import ProfileNav from '../ProfileNav'
import EmptySkeleton from '../EmptyTemplate/EmptySkeleton'
import UserSection from '../UserSection';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LikedPost from '../LikedPostsBody/LikedPost';
import UploadFirstCard from '../EmptyTemplate/UploadFirstCard';
import useAuthUser from '../../../hooks/authentication/useAuthUser';
import Footer from '@/components/Footer/Footer';

const fetchMyPosts = async (username) => {
    const { data } = await axios.get(`/api/posts/user/${username}`);
    return data.posts;
};

const MyPostsContainer = () => {
    const empty = false;
    const cardText = 'Add your first post';
    const buttonLink = '/create-post';
    //const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const { authUser } = useAuthUser();

    const { data: posts, isLoading, error} = useQuery({
        queryKey: ['my-posts'],
        queryFn: () => fetchMyPosts(authUser?.username),
    });
    console.log("my posts",posts);

    if (isLoading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Handle error state
    }
    return (
        <div className='flex flex-col absolute left-0 w-full z-1 py-3 sm:px-9 bg-background'>
            <UserSection />
            <ProfileNav/>
            { posts && posts.length ? (
                <>
                <div className='grid grid-cols-1 justify-items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-5'>
                    <UploadFirstCard cardText="Create New Post" buttonLink={buttonLink}/>
                    {posts.map((post) => (
                        <LikedPost key={post._id} post={post}/>
                    ))}
                </div>
                </>
            ):
            (
                <EmptySkeleton cardText={cardText} buttonLink={buttonLink}/>
            )
            }
            <Footer/>
        </div>
    )
}

export default MyPostsContainer