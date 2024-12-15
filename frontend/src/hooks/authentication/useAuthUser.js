import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuthUser = () => {
    const navigate = useNavigate();

    const { data: authUser, isLoading, isError } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
        try {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (data.error) return null;
            if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
            }
            console.log("authUser is here:", data);
            return data;
        } catch (error) {
            throw new Error(error);
        }
        },
        retry: false,
    });

    useEffect(() => {
        if (isError) {
        navigate('/'); // Redirect to login page if there's an error
        }
    }, [isError, navigate]);

    return { authUser, isLoading };
};

export default useAuthUser;

// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const useAuthUser = () => {
//     const navigate = useNavigate();

//     const { data: authUser, isLoading, isError } = useQuery({
//         queryKey: ['authUser'],
//         queryFn: async () => {
//             const storedUser = localStorage.getItem("bookbliss-user");
//             if (storedUser) {
//                 return JSON.parse(storedUser);
//             }
//             const res = await fetch("/api/auth/me");
//             const data = await res.json();
//             if (data.error) return null;
//             if (!res.ok) {
//                 throw new Error(data.error || "Something went wrong");
//             }
//             localStorage.setItem("bookbliss-user", JSON.stringify(data));
//             return data;
//         },
//         retry: false,
//     });

//     useEffect(() => {
//         if (isError) {
//             navigate('/login'); // Redirect to login page if there's an error
//         }
//     }, [isError, navigate]);

//     return { authUser, isLoading };
// };

// export default useAuthUser;

