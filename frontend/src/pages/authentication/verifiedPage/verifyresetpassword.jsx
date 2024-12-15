import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import img from '../../../images/g1.jpg'
import animationData2 from '../../../animations/failed.json'
import Lottie from 'react-lottie';

const VerifyResetPassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const error = queryParams.get('error');
    const message = queryParams.get('message');
    const [verificationStatus, setVerificationStatus] = useState(null);

    useEffect(() => {
        if (error === 'true') {
            setVerificationStatus('failed');
        } else {
            setVerificationStatus('unknown');
        }
    }, [error]);

    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="absolute left-0 top-0 h-screen w-screen flex items-center justify-center " style={{backgroundImage: `url(${img})`}}>
            <div className='container flex flex-col items-center justify-center'>
                <div className= 'p-6 rounded-3xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-md backdrop-brightness-90 bg-opacity-0'>
                    {verificationStatus === 'failed' && (
                        <div className='flex flex-col items-center justify-center'>
                            <div>
                                <Lottie
                                    height='220px'
                                    width='220px'
                                    options={defaultOptions2}
                                />  
                            </div>
                            <p className='text-3xl font-semibold text-center mt-8 text-red-600'>Link Expired!</p>
                            <p className='font-normal text-secondary text-base text-center mt-5'>To reset your password, return to the signin <br/>page and select "Forgot Password" to<br/> send a new email.</p>
                            <div className='text-center mt-8'>
                                <button className='button w-64 rounded-3xl h-10 bg-red-600 hover:bg-red-500 text-white font-bold'>
                                    <Link to={'/login'}>Sign In</Link>
                                </button>
                            </div>
                        </div>
                    )}
                    {verificationStatus === 'unknown' && (
                        <div className='flex flex-col items-center justify-center'>
                            <div>
                                <Lottie
                                    height='220px'
                                    width='220px'
                                    options={defaultOptions2}
                                />  
                            </div>
                            <p className='text-3xl font-semibold text-center mt-8 text-red-600'>Link Expired!</p>
                            <p className='font-normal text-secondary text-base text-center mt-5'>To reset your password, return to the signin<br/>  page and select "Forgot Password" to <br/>send a new email.</p>
                            <div className='text-center mt-8'>
                                <button className='button w-64 rounded-3xl h-10 bg-red-600 hover:bg-red-500 text-white font-bold'>
                                    <Link to={'/login'}>Sign In</Link>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyResetPassword;