import React from 'react'
import ProfileNav from '../ProfileNav';
import UserSection from '../UserSection';
import AboutSection from './AboutSection';
import Footer from '@/components/Footer/Footer';


const AboutContainer = () => {
    return (
        <div className='flex flex-col absolute left-0 w-full z-1 py-3 sm:px-9 bg-background'>
            <UserSection/>
            <ProfileNav />
            <AboutSection/>
            <Footer/>
        </div>
    )
}

export default AboutContainer