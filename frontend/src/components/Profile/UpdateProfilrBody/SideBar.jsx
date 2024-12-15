import React from 'react'
import { useNavigate } from 'react-router-dom';

const menu = [
    { name: 'General', path: '/editprofile' },
    { name: 'Edit Profile', path: '/admin/profile' },
    { name: 'Password', path: '/admin/library' },
    { name: 'Social Profiles', path: '/admin/profile' },
    { name: 'Payment', path: '/admin/customers'},
    { name: 'Billing', path: '/admin/orders' },
    { name: 'Sales', path: '/admin/analytics' },
    { name: 'Subscription', path: '/admin/orders' },
    { name: 'Email Notifications', path: '/admin/analytics' },
    { name: 'Delete Account', path: '/admin/analytics' },
];

const SideBar = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col border-r gap-1 border-divider-color px-3'>
            {menu.map((item, index) => (
                <button key={index} onClick={ () => navigate(`${item.path}`)} 
                    className={`flex justify-center items-center rounded-full py-2 px-3
                        bg-btn-secondary bg-opacity-0 hover:bg-btn-secondary hover:bg-opacity-40
                        ${location.pathname === `${item.path}` ? 'bg-opacity-40' : ''}`}>
                    <div className='text-md text-center text-primary mt-1'>{item.name}</div>
                </button>
            ))}
        </div>
    )
}

export default SideBar