import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';

const useSignin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const signin = async ({ email, password }) => {
        const success = handleInputErrors({ email, password });
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem('bookbliss-user', JSON.stringify(data));
            setAuthUser(data);
            toast.success('Signin successful');
            navigate('/home');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signin };
};

export default useSignin;

function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error('Please fill in all fields.');
        return false;
    }
    return true;
}
