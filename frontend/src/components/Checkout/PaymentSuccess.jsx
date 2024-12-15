import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { paymentVerificationAPI } from "@/APIServices/Stripe/ordersPaymentAPI";
import img from '../../images/g1.jpg';
import animationData1 from '../../animations/verified.json'
import animationData2 from '../../animations/failed.json'
import Lottie from 'react-lottie';

const PaymentSuccess = () => {
    //get the query data for payment id
    const [searchParams] = useSearchParams();
    const paymentIntentId = searchParams.get("payment_intent");
    const { data, isError, isLoading, isSuccess, error } = useQuery({
        queryKey: ["verify-payment"],
        queryFn: () => paymentVerificationAPI(paymentIntentId),
    });
    console.log(data);

    const defaultOptions1 = {
        loop: true,
        autoplay: true,
        animationData: animationData1,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };

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
                {isLoading ? (
                <div className="flex flex-col items-center space-y-4">
                    <FaSpinner className="animate-spin text-4xl text-orange-500" />
                    <p className="text-xl text-background">
                    Verifying your payment, please wait...
                    </p>
                </div>
                ) : isError ? (
                <div className="flex flex-col items-center space-y-4">
                    <div>
                                <Lottie
                                    height='220px'
                                    width='220px'
                                    options={defaultOptions2}
                                />  
                            </div>
                    <p className="text-2xl font-semibold text-center mt-8 text-red-600">Payment verification failed</p>
                    <p className=" text-background">{error.message}</p>
                    <Link
                    to="/home"
                    className="w-64 flex items-center rounded-3xl justify-center py-2 px-4 bg-red-600 hover:bg-red-500 text-white focus:outline-none"
                    >
                        Return To Home
                    </Link>
                </div>
                ) : (
                <div className="flex flex-col items-center space-y-4">
                    <div>
                        <Lottie
                            height='100%'
                            width='100%'
                            options={defaultOptions1}
                        />  
                    </div>
                    <h1 className="text-2xl font-semibold text-center mt-8 text-green-500">Payment Successful</h1>
                    <p className=" text-background">
                    Thank you for your payment.
                    </p>
                    <Link
                    to="/home"
                    className="w-full flex items-center rounded-3xl justify-center py-2 px-4 bg-green-500 hover:bg-green-600 text-white focus:outline-none"
                    >
                        Return To Home
                    </Link>
                </div>
                )}
                </div>
            </div>
        </div>
    );
    return (
        <div className="absolute left-0 top-0 h-screen w-screen flex items-center justify-center " style={{backgroundImage: `url(${img})`}}>
            <div className='container flex flex-col items-center justify-center'>
                <div className= 'p-6 rounded-3xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-md backdrop-brightness-90 bg-opacity-0'>
                    {verificationStatus === 'success' && (
                        <div className='flex flex-col items-center justify-center'>
                            <div>
                                <Lottie
                                    height='100%'
                                    width='100%'
                                    options={defaultOptions1}
                                />  
                            </div>
                            <p className='text-2xl font-semibold text-center mt-8 text-green-500'>Email verified successfully!</p>
                            <div className='text-center mt-8'>
                                <button className='button w-64 rounded-3xl h-10 bg-green-500 hover:bg-green-600 text-white font-bold'>
                                    <Link to={'/login'}>Sign In</Link>
                                </button>
                            </div>
                        </div>
                    )}
                    {verificationStatus === 'failed' && (
                        <div className='flex flex-col items-center justify-center'>
                            <div>
                                <Lottie
                                    height='220px'
                                    width='220px'
                                    options={defaultOptions2}
                                />  
                            </div>
                            <p className='text-2xl font-semibold text-center mt-8 text-red-600'>Email verification failed!</p>
                            <p className='font-normal text-red-600 text-sm mt-5'>{message}</p>
                            <div className='text-center mt-8'>
                                <button className='button w-64 rounded-3xl h-10 bg-red-600 hover:bg-red-700 text-white font-bold'>
                                    <Link to={'/signup'}>Sign Up</Link>
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
                            <p className='text-2xl font-semibold text-center mt-8 text-red-600'>Invalid verification link!</p>
                            <div className='text-center mt-8'>
                                <button className='button w-64 rounded-3xl h-10 bg-red-600 hover:bg-red-700 text-white font-bold'>
                                    <Link to={'/signup'}>Sign Up</Link>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;