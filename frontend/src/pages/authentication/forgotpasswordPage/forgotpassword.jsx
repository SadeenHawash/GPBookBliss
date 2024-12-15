import React, { useState } from 'react';
import useForgotPassword from '../../../hooks/authentication/useForgotPassword';
import img from '../../../images/g1.jpg'

const ForgotPassword = () => {
    const [inputs, setInputs] = useState({
        email: ''
    });
    const{loading, forgotpassword} = useForgotPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotpassword(inputs);
    }

    return (
        <div className="absolute left-0 top-0 h-screen w-screen flex items-center justify-center " style={{backgroundImage: `url(${img})`}}>
            <div className='container flex flex-col items-center justify-center'>
                <div className= 'p-6 rounded-3xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-md backdrop-brightness-90 bg-opacity-0'>
                    <h1 className='text-3xl font-bold text-center text-primary'>
                        Forgot your password?
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-7 text-secondary text-md'>
                            <p>
                            Enter the email address you used when you joined and <br /> we’ll send you instructions to reset your password.
                            </p>
                            <br /><p>
                            For security reasons, we do NOT store your password.<br /> So rest assured that we will never send your password <br />via email.
                            </p>
                        </div>
                        <div className='mt-5'>
                            <label className='label p-1'>
                                <span className='text-sm text-secondary'>Email</span>
                            </label>
                            <input className='input w-full rounded-3xl input-bordered border-opacity-85 border-secondary h-10 placeholder:text-secondary placeholder:text-sm focus:border-primary hover:border-primary text-sm text-secondary bg-transparent'
                                type='text' placeholder='Enter email' value={inputs.email} 
                                onChange={(e) => setInputs({...inputs, email: e.target.value })} />
                        </div>
                        <div className='text-center mt-8'>
                            <button className='button w-full shadow rounded-3xl h-10 bg-primary text-secondary text-md'
                                disabled={loading}
                            >
                                {loading ? <span className='spinner-border spinner-border-sm'></span> : "Send Reset Instructions"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword 