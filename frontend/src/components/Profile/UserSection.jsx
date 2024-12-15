import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import useAuthUser from '@/hooks/authentication/useAuthUser';

const UserSection = () => {
    //const {authUser} = useAuthContext();
    const { authUser } = useAuthUser();
    return (
        <div className="w-full container pt-16 pb-4 flex content-center items-center justify-center bg-background">
            <div className="flex justify-center flex-wrap mx-auto mb-5 mt-6 ">
                <img
                    className="inline-block h-28 w-28 rounded-full ring-primary"
                    src={authUser.profilePic}
                    alt=""
                />
                <div className='flex items-center pl-8'>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-primary font-semibold text-3xl">
                            {authUser.fullName}
                        </h1>
                        <Link to='/editprofile' className="button text-btn-secondary text-sm sm:[text-center]">
                            Edit Profile
                        </Link>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default UserSection