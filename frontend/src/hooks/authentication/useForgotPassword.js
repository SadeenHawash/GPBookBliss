import { useState } from 'react';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const forgotpassword = async({email}) => {
        const success = handleInputErrors({email});
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            console.log(data);
            toast.success('Please check your email for reseting your password.');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, forgotpassword};
}

export default useForgotPassword;

function handleInputErrors({email}){
    if(!email ){
        toast.error('Please fill in the field.');
        return false;
    }
    return true;
}