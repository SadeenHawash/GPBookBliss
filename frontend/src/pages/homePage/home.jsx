import React from 'react'

import PrivateNavbar from '../../components/Navbar/PrivateNavbar/PrivateNavbar';
import PublicNavbar from '../../components/Navbar/PublicNavbar/PublicNavbar';
import { useAuthContext } from '../../context/authContext';
import Section1 from '../../components/Home/section1';
import ListAllPosts from '../../components/Profile/MyPostsBody/Posts/ListAllPosts';
import MainCarousel from '@/components/Home/MainCarousel';
import HomeBody from '@/components/Home/HomeBody';

const Home = () => {
    //const authUser = useAuthContext();
    return (
        <div>
            <PrivateNavbar/>
            <HomeBody/>
            {/* <Section1/>
            <MainCarousel/> */}
            {/* <div className=' h-96'>
                hello
            </div>
            <div className=' h-96 bg-slate-400'>
            <ListAllPosts />
            </div> */}
        </div>
    );
}

export default Home;