import { useState } from "react";
import toast from 'react-hot-toast';

const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const resetpassword = async({password, confirmPassword, uid}) => {
        const success = handleInputErrors({password, confirmPassword});
        if(!success) return;
        setLoading(true);
        try{
            const res = await fetch(`/api/reset-password?uid=${uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,
                    confirmPassword,
                })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Password updated successfully, please check your email.');
            } else {
                toast.error(data.error || 'Failed to reset password.');
            }
            console.log(data);
        }catch (error) {
            console.error('Error resetting password:', error);
            toast.error('An error occurred while resetting your password.');
        } finally {
            setLoading(false);
        }
    }
    return {loading, resetpassword};
};

export default useResetPassword;

function handleInputErrors ({password, confirmPassword}){
    if(!password || !confirmPassword){
        toast.error('Please fill in all fields.');
        return false;
    }
    return true;
}