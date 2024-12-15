import React from 'react'
import PrivateNavbar from '../../../components/Navbar/PrivateNavbar/PrivateNavbar'
import ProfilePageContainer from '../../../components/Profile/ProfilePageContainer'
import Footer from '../../../components/Footer/Footer'
export default function Profile() {
    return (
        <div>
            <PrivateNavbar />
            <ProfilePageContainer />
            {/* <Footer /> */}
        </div>
    )
}

