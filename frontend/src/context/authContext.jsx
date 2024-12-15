import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('bookbliss-user');
        if (storedUser) {
            setAuthUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);


//import { useState , useContext, createContext  } from "react";

// export const AuthContext = createContext();

// export const useAuthContext = () => {
//     return useContext(AuthContext);
// }

// export const AuthContextProvider = ({children}) => {

//     const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("bookbliss-user")) || null);
    
//     return <AuthContext.Provider value={{authUser, setAuthUser}} >
//         {children}
//     </AuthContext.Provider>;
// }


