import React from 'react'
import ProfileNav from '../ProfileNav'
import EmptySkeleton from '../EmptyTemplate/EmptySkeleton'
import UserSection from '../UserSection';
import Footer from '@/components/Footer/Footer';

const MyBooksContainer = () => {
    const empty = true;
    const cardText = 'Upload your first story';
    const buttonLink = '/profile/add-story';
    return (
        <div className='flex flex-col absolute left-0 w-full z-1 py-3 sm:px-9 bg-background'>
            <UserSection/>
            <ProfileNav/>
            {empty ? (
                <EmptySkeleton cardText={cardText} buttonLink={buttonLink}/>
            ):
            (
                <>
                <div>Values</div>
                </>
            )
            }
            <Footer/>
        </div>
    )
}

export default MyBooksContainer