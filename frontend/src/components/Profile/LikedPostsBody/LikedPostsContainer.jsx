import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import LikedPost from './LikedPost';
import UserSection from '../UserSection';
import ProfileNav from '../ProfileNav';
import axios from 'axios';
import useAuthUser from '../../../hooks/authentication/useAuthUser';
import Footer from '@/components/Footer/Footer';

const fetchLikedPosts = async () => {
    const { data } = await axios.get('/api/posts/liked-posts');
    return data.likedPosts;
};

const LikedPostsContainer = () => {
    //const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const { authUser } = useAuthUser();

    const { data: likedPosts, isLoading, error} = useQuery({
        queryKey: ['liked-posts'],
        queryFn: fetchLikedPosts,
    });

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
            { likedPosts && likedPosts.length  ? (
                <>
                <div className='grid grid-cols-1 justify-items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-5'>
                    {likedPosts.map((post) => (
                        <LikedPost key={post._id} post={post} show={false}/>
                    ))}
                </div>
                </>
            ):
            (
                <>
                <div className='flex flex-col justify-center items-center h-72'>
                    <p className='text-sm text-btn-secondary'>You have not liked any posts yet.</p>
                </div>
                </>
            )
            }
            <Footer/>
        </div>
    )
}

export default LikedPostsContainer