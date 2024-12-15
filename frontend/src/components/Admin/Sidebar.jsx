import React from 'react'
import { BiSolidMessageDetail } from 'react-icons/bi';
import { IoLibrary, IoSettingsSharp, IoStatsChart } from 'react-icons/io5';
import { TbBorderStyle } from 'react-icons/tb';
import { SiGoogleanalytics } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';

const menu = [
    { name: 'Dashboard', path: '/admin', icon: <MdSpaceDashboard /> },
    { name: 'Sales', path: '/admin/sales', icon: <IoStatsChart />},
    { name: 'Library', path: '/admin/library', icon: <IoLibrary /> },
    { name: 'Customers', path: '/admin/customers', icon: <BsFillPeopleFill /> },
    { name: 'Orders', path: '/admin/orders', icon: <TbBorderStyle /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <SiGoogleanalytics /> },
    { name: 'Messages', path: '/admin/messages', icon: <BiSolidMessageDetail /> },
    { name: 'Setting', path: '/admin/messages', icon: <IoSettingsSharp /> },
];

const SideBar = () => {
    const navigate = useNavigate();

    return (
        <div className='w-[8%] flex flex-col justify-center border-r gap-1 border-divider-color px-1'>
            {menu.map((item, index) => (
                <button key={index} onClick={ () => navigate(`${item.path}`)} 
                    className={`flex flex-col justify-center items-center rounded-lg py-[9px] 
                        bg-btn-secondary bg-opacity-0 hover:bg-btn-secondary hover:bg-opacity-40
                        ${location.pathname === `${item.path}` ? 'bg-opacity-40' : ''}`}>
                    <div className='text-3xl text-primary'>{item.icon}</div>
                    <div className='text-xs text-center text-primary mt-1'>{item.name}</div>
                </button>
            ))}
        </div>
    )
}

export default SideBar