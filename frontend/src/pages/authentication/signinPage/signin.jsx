import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignin from '../../../hooks/authentication/useSignin';
import img from '../../../images/g1.jpg'

const SignIn = () => {
    const navigate = useNavigate();
    const [inputs , setInputs] = useState({
        email: '',
        password: ''
    });

    const{loading, signin} = useSignin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(inputs);
        //navigate('/home');
    }
    return (
            <div className="absolute left-0 top-0 h-screen w-screen flex items-center justify-center " style={{backgroundImage: `url(${img})`}}>
                <div className='container flex flex-col items-center justify-center'>
                    <div className= 'p-6 rounded-3xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-md backdrop-brightness-90 bg-opacity-0'>
                        <h1 className='text-3xl font-bold text-center text-primary'>
                            Sign in to <span className='text-secondary'>BookBliss</span>
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-7'>
                                <label className='label p-1'>
                                    <span className='text-sm text-secondary'>Email</span>
                                </label>
                                <input className='input w-full rounded-3xl input-bordered border-opacity-85 border-secondary h-10 placeholder:text-secondary placeholder:text-sm focus:border-primary hover:border-primary text-sm text-secondary bg-transparent'
                                    type='text' placeholder='Enter email' value={inputs.email} 
                                    onChange={(e) => setInputs({...inputs, email: e.target.value })} />
                            </div>
                            <div className='mt-2'>
                                <label className='label p-1'>
                                    <span className='text-sm text-secondary'>Password</span>
                                </label>
                                <input className='input w-full rounded-3xl input-bordered h-10 border border-secondary placeholder:text-secondary placeholder:text-sm focus:border-primary hover:border-primary text-sm text-secondary bg-transparent' 
                                    type='password' placeholder='Enter password' value={inputs.password} 
                                    onChange={(e) => setInputs({...inputs, password: e.target.value })} />
                                <Link to={'/forgot-password'} className='text-secondary text-xs mt-1 ml-2 inline-block hover:underline hover:text-primary'>Forgot password?</Link>
                            </div>
                            <div className='text-center mt-8'>
                                <button className='button w-full shadow rounded-3xl h-10 bg-primary text-secondary text-md'
                                disabled={loading}
                                >
                                    {loading ? <span className='spinner-border spinner-border-sm'></span> : "Sign In"}
                                </button>
                            </div>
                            <div className='text-center'>
                                <Link to={'/signup'} className='text-sm text-secondary mt-2 inline-block'>
                                    {"Don't"} have an account?<span className='hover:underline hover:text-primary '> SignUp</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default SignIn;

// bg-indigo-300

//bg-rgb(230,219,206);