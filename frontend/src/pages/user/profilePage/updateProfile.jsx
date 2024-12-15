import React from 'react'
import PrivateNavbar from '../../../components/Navbar/PrivateNavbar/PrivateNavbar'
import UpdateProfileContainer from '@/components/Profile/UpdateProfilrBody/UpdateProfileContainer'

const UpdateProfile = () => {
    return (
        <div>
            <PrivateNavbar />
            <UpdateProfileContainer/>
        </div>
    )
}

export default UpdateProfile