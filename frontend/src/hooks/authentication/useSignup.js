import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/authContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const signup = async({fullName, username, email, password, confirmPassword}) => {
        const success = handleInputErrors({fullName, username, email, password, confirmPassword});
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    email,
                    password,
                    confirmPassword
                })
            });
            const data = await res.json();
            if (res.ok) { // Check if response is successful
                toast.success('Please check your email for verification.');
                return data;
            } else {
                throw new Error(data.error); // Handle error response
            }
            //local storage
            //localStorage.setItem("bookbliss-user", JSON.stringify(data));
            // context 
            //setAuthUser(data);
            console.log(data);
            //toast.success('Please check your email for verification.');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, signup};
}

export default useSignup

function handleInputErrors({fullName, username, email, password, confirmPassword}){
    if(!fullName || !username || !email || !password || !confirmPassword){
        toast.error('Please fill in all fields.');
        return false;
    }
    if(password.length < 6){
        toast.error('Password must be at least 6 characters long.');
        return false;
    }
    if(password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return false;
    }
    return true;
}