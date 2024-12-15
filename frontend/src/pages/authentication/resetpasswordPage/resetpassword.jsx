import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useResetPassword from '../../../hooks/authentication/useResetPassword';
import img from '../../../images/g1.jpg'

const ResetPassword = () => {
    const[inputs, setInputs] = useState({
        password: '',
        confirmPassword: ''
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get('uid');

    const {loading, resetpassword} = useResetPassword();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await resetpassword({...inputs, uid});
    }
    return (
        <div className="absolute left-0 top-0 h-screen w-screen flex items-center justify-center " style={{backgroundImage: `url(${img})`}}>
            <div className='container flex flex-col items-center justify-center'>
                <div className= 'p-6 rounded-3xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-md backdrop-brightness-90 bg-opacity-0'>
                    <h1 className='text-3xl font-bold text-center text-primary'>
                        Reset your password
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-7'>
                            <label  className='label p-2'>
                                <span className='text-sm text-secondary'>New password</span>
                            </label>
                            <input className='input w-full rounded-3xl input-bordered border-opacity-85 border-secondary h-10 placeholder:text-secondary placeholder:text-sm focus:border-primary hover:border-primary text-sm text-secondary bg-transparent'
                                type='password' placeholder='New password' value={inputs.password} 
                                onChange={(e) => setInputs({...inputs, password: e.target.value })}/>
                        </div>
                        <div className='mt-3'>
                            <label className='label p-2'>
                                <span className='text-sm text-secondary'>Confirm Password</span>
                            </label>
                            <input className='input w-full rounded-3xl input-bordered border-opacity-85 border-secondary h-10 placeholder:text-secondary placeholder:text-sm focus:border-primary hover:border-primary text-sm text-secondary bg-transparent'
                                type='password' placeholder='Confirm new password' value={inputs.confirmPassword}
                                onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value })}/>
                        </div>
                        <div className='text-center mt-8'>
                            <button className='button w-full shadow rounded-3xl h-10 bg-primary text-secondary text-md'
                            disabled={loading}
                            >
                                {loading ? <span className='spinner-border spinner-border-sm'></span> : "Reset Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword