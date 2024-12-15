import { useAuthContext } from '@/context/authContext';
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const { authUser } = useAuthContext();

    if (!authUser) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
