import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';

export default function useSignout () {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const navigate = useNavigate();
    const signout = async() => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Contenet-Type': 'application/json',
                }  
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem("bookbliss-user");
            setAuthUser(null);
            navigate('/');
            toast.success('Signed out successfully');
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    return {loading, signout};
}
