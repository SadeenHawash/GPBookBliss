import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosInterceptors = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const responseInterceptor = axios.interceptors.response.use(
    //         response => response,
    //         error => {
    //             if (error.response && error.response.status === 401) {
    //                 navigate('/login');
    //             }
    //             return Promise.reject(error);
    //         }
    //     );

    //     return () => {
    //         axios.interceptors.response.eject(responseInterceptor);
    //     };
    // }, [navigate]);
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                // Token has expired or is invalid
                //history.push('/login');
                navigate('/');
            }
            return Promise.reject(error);
        }
    );
};

export default useAxiosInterceptors;
