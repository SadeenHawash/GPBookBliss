import { fetchAllUsers } from '@/APIServices/Users/usersAPI';
import { ThemeProvider, createTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { format, formatDistanceToNow } from 'date-fns';

const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    color: '#6f4e37',
                    fontSize: '13px',
                },
                columnHeaders: {
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#f2eae2',
                    fontSize: '14px',
                },
                genresColumn: {
                    overflowX: 'scroll',
                    whiteSpace: 'nowrap',
                    width: '240px',
                    backgroundColor: '#f2eae2',
                },
            },
        },
    },
});

const CustomersPageContainer = () => {
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'imageName',
            headerName: 'User',
            width: 230,
            renderCell: (params) => (
                <div className='ml-2 rounded-full' style={{ display: 'flex', alignItems: 'center' }}>
                    <img className='rounded-full' src={params.row.profilePic} alt={params.row.userName} style={{ width: 50, height: 50, objectFit: 'fill', marginRight: 10 }} />
                    <span>{params.row.fullName}</span>
                </div>
            ),
        },
        {
            field: 'userName',
            headerName: 'User Name',
            width: 120,
            renderCell: (params) => (
                <div>{params.row.username}</div>
            ),
        },
        {
            field: 'email',
            headerName: 'Email Address',
            width: 240,
            renderCell: (params) => (
                <div>{params.row.email}</div>
            ),
        },
        // {
        //     field: 'shippingAddress',
        //     headerName: 'Shipping Address',
        //     width: 160, 
        //     className: 'shippingAddressColumn', 
        //     renderCell: (params) => <div className='flex'>
        //         <p>{params.row.shippingAddress.state}</p>
        //         <p> , {params.row.shippingAddress.city}</p>
        //         <p> , {params.row.shippingAddress.streetAddress}</p>
        //     </div>, 
        // },
        // {
        //     field: 'mobileNumber',
        //     headerName: 'Mobile Number',
        //     width: 120, 
        //     className: 'mobileNumberColumn', 
        //     renderCell: (params) => <div>{params.row.shippingAddress.mobile}</div>, 
        // },
        // { field: 'orderTotal', headerName: 'Total', width: 80, 
        //     renderCell: (params) => <div>{params.row.orderTotal}$</div>, 
        // },
        // { field: 'orderStatus', headerName: 'Status', width: 100 , 
        //     renderCell: (params) => (
        //         <button className='flex justify-center' onClick={() => handleClickOpen(params.row)}>
        //             {params.row.orderStatus}
        //         </button>
        //     )
        // },
        {
            field: 'joinedAt',
            headerName: 'Joined At',
            width: 490,
            renderCell: (params) => (
                <div>{new Date(params.row.createdAt).toDateString() === new Date().toDateString() ?
                    `${formatDistanceToNow(new Date(params.row.createdAt), { addSuffix: true })}`
                    : `${format(new Date(params.row.createdAt), 'MMM d, yyyy')}`
                    }</div>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 90,
            //onClick={() => handleDelete(params.row.id)}
            renderCell: (params) => (
                <button className='flex justify-center pt-4 pl-3'>
                    <FaTrash className='cursor-pointer text-primary hover:text-red-500' />
                </button>
            ),
        },
    ];

    const fetchCustomers = async () => {
        try {
            const customers = await fetchAllUsers();
            const formattedCustomers = customers.map((customer) => ({
                id: customer._id,
                fullName: customer.fullName, // Assuming image is a URL to the book cover image
                username: customer.username,
                email: customer.email,
                profilePic: customer.profilePic,
                createdAt: customer.createdAt,
            }));
            setRows(formattedCustomers );
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    useEffect(() => {
        fetchCustomers();
    }, []);

    // const handleDelete = async (orderId) => {
    //     try {
    //         await deleteOrderAPI(orderId);
    //         setRows((prevRows) => prevRows.filter((row) => row.id !== orderId));
    //     } catch (error) {
    //         console.error('Error deleting order:', error);
    //     }
    // };

    return (
        <ThemeProvider theme={theme}>
            <div className='w-full flex flex-col'>
                <div className='relative mx-2 border-b mb-1 border-divider-color'>
                    <div className='flex justify-between px-2 pt-1'>
                        <div className='py-1 text-primary text-3xl font-bold'>
                            Customers
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center rounded-full mt-14">
                    <div style={{ height: 400, width: '98%' }} className="box rounded-2xl">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            pagination
                            rowsPerPageOptions={[5, 10, 20]}
                            //checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default CustomersPageContainer