import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash } from 'react-icons/fa';
import { createTheme, ThemeProvider, Dialog, DialogContent } from '@mui/material';
import { cancelOrderAPI, confirmedOrderAPI, deleteOrderAPI, deliverOrderAPI, fetchAllOrders, placeOrderAPI, shipOrderAPI } from '@/APIServices/Orders/ordersAPI';
import { format, formatDistanceToNow } from 'date-fns';
import { IoCheckmark } from 'react-icons/io5';

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

const OrdersPageContainer = () => {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState('');

    const handleClickOpen = (order) => {
        setCurrentOrder(order);
        setUpdatedStatus(order.orderStatus);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeStatus = async (newStatus, apiCall) => {
        try {
            await apiCall(currentOrder.id); // Pass currentOrder.id to the API call
            setUpdatedStatus(newStatus);
            setRows((prevRows) => prevRows.map(row => row.id === currentOrder.id ? { ...row, orderStatus: newStatus } : row));
            setOpen(false);
        } catch (error) {
            console.error(`Error updating order status to ${newStatus}:`, error);
        }
    };

    const columns = [
        {
            field: 'orderItems',
            headerName: 'Orders Items',
            width: 230,
            renderCell: (params) => (
                Array.isArray(params.row.orderItems) ? (
                    <div className='flex items-center mt-1' style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                        {params.row.orderItems.map((item, index) => (
                            <img className='rounded-full' key={index} src={item.image} alt={`Order Item ${index + 1}`} style={{ width: 45, height: 45, objectFit: 'cover' }} />
                        ))}
                    </div>
                ) : (
                    <div>No items</div>
                )
            ),
        },
        {
            field: 'userName',
            headerName: 'User Name',
            width: 120,
            renderCell: (params) => (
                <div>{params.row.orderUser}</div>
            ),
        },
        {
            field: 'shippingAddress',
            headerName: 'Shipping Address',
            width: 160, 
            className: 'shippingAddressColumn', 
            renderCell: (params) => <div className='flex'>
                <p>{params.row.shippingAddress?.state}</p>
                <p> , {params.row.shippingAddress?.city}</p>
                <p> , {params.row.shippingAddress?.streetAddress}</p>
            </div>, 
        },
        {
            field: 'mobileNumber',
            headerName: 'Mobile Number',
            width: 120, 
            className: 'mobileNumberColumn', 
            renderCell: (params) => <div>{params.row.shippingAddress?.mobile}</div>, 
        },
        { field: 'orderTotal', headerName: 'Total', width: 80, 
            renderCell: (params) => <div>{params.row.orderTotal}$</div>, 
        },
        { field: 'orderStatus', headerName: 'Status', width: 100 , 
            renderCell: (params) => (
                <button className='flex justify-center' onClick={() => handleClickOpen(params.row)}>
                    {params.row.orderStatus}
                </button>
            )
        },
        {
            field: 'paymentDetails',
            headerName: 'Payment',
            width: 110,
            renderCell: (params) => (
                <div>{params.row.paymentDetails}</div>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 130,
            renderCell: (params) => (
                <div>{new Date(params.row.createdAt).toDateString() === new Date().toDateString() ?
                    `${formatDistanceToNow(new Date(params.row.createdAt), { addSuffix: true })}`
                    : `${format(new Date(params.row.createdAt), 'MMM d, yyyy')}`
                    }</div>
            ),
        },
        // {
        //     field: 'edit',
        //     headerName: 'Edit',
        //     width: 20,
        //     renderCell: (params) => 
        //         <span className='flex justify-center pt-3 pl-3'>
        //             <RiEditFill className='cursor-pointer w-6 h-6 text-primary hover:text-red-500' />
        //         </span>
        // },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 90,
            renderCell: (params) => (
                <button className='flex justify-center pt-4 pl-3' onClick={() => handleDelete(params.row.id)}>
                    <FaTrash className='cursor-pointer text-primary hover:text-red-500' />
                </button>
            ),
        },
    ];

    const fetchOrders = async () => {
        try {
            const orders = await fetchAllOrders();
            const formattedOrders = orders.map((order) => ({
                id: order._id,
                orderUser: order.orderUser.fullName, // Assuming image is a URL to the book cover image
                orderTotal: order.orderTotal,
                shippingAddress: order.shippingAddress,
                discount: order.discount,
                orderStatus: order.orderStatus,
                orderItems: order.orderItems.map(item => ({
                    image: item.book.image, // Adjust based on the actual structure of the book object
                    quantity: item.quantity
                })),
                createdAt: order.createdAt,
                paymentDetails: order.paymentDetails.paymentStatus
            }));
            setRows(formattedOrders );
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        try {
            await deleteOrderAPI(orderId);
            setRows((prevRows) => prevRows.filter((row) => row.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='w-full flex flex-col'>
                <div className='relative mx-2 border-b mb-1 border-divider-color'>
                    <div className='flex justify-between px-2 pt-1'>
                        <div className='py-1 text-primary text-3xl font-bold'>
                            Orders
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
                <Dialog
                    open={open}
                    onClose={handleClose}
                    sx={{
                        '& .MuiDialog-paper': {
                            borderRadius: '15px',
                            padding: '10px',
                            backgroundColor: '#f2eae2',
                            color: '#6f4e37',
                        },
                    }}
                >
                    <DialogContent>
                        <div className='pb-5 text-primary text-2xl font-bold font-serif'>
                            Update Order Status
                        </div>
                        <div className='flex flex-col gap-2 font-serif justify-center'>
                            <button 
                                className={`flex justify-center gap-1 py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary
                                    ${currentOrder?.orderStatus === 'PLACED' ? 'bg-btn-secondary bg-opacity-30' : ''}`}
                                onClick={() => handleChangeStatus('PLACED', placeOrderAPI)}
                            >
                                <IoCheckmark className={`w-5 h-5 font-bold ${currentOrder?.orderStatus === 'PLACED' ? 'inline-block' : 'hidden'}`}/> Place Order
                            </button>
                            <button 
                                onClick={() => handleChangeStatus('CONFIRMED', confirmedOrderAPI)}
                                className={`flex justify-center gap-1 py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary ${
                                    currentOrder?.orderStatus === 'CONFIRMED' ? 'bg-btn-secondary bg-opacity-30' : ''
                                }`}
                            >
                                <IoCheckmark
                                    className={`w-5 h-5 font-bold ${
                                        currentOrder?.orderStatus === 'CONFIRMED' ? 'inline-block' : 'hidden'
                                    }`}
                                />{' '}
                                Confirm Order
                            </button>

                            <button 
                                onClick={() => handleChangeStatus('SHIPPED', shipOrderAPI)}
                                className={`flex justify-center gap-1 py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary ${
                                    currentOrder?.orderStatus === 'SHIPPED' ? 'bg-btn-secondary bg-opacity-30' : ''
                                }`}
                            >
                                <IoCheckmark
                                    className={`w-5 h-5 font-bold ${
                                        currentOrder?.orderStatus === 'SHIPPED' ? 'inline-block' : 'hidden'
                                    }`}
                                />{' '}
                                Ship Order
                            </button>

                            <button 
                                onClick={() => handleChangeStatus('DELIVERED', deliverOrderAPI)}
                                className={`flex justify-center gap-1 py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary ${
                                    currentOrder?.orderStatus === 'DELIVERED' ? 'bg-btn-secondary bg-opacity-30' : ''
                                }`}
                            >
                                <IoCheckmark
                                    className={`w-5 h-5 font-bold ${
                                        currentOrder?.orderStatus === 'DELIVERED' ? 'inline-block' : 'hidden'
                                    }`}
                                />{' '}
                                Deliver Order
                            </button>

                            <button 
                                onClick={() => handleChangeStatus('CANCELED', cancelOrderAPI)}
                                className={`flex justify-center gap-1 py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary ${
                                    currentOrder?.orderStatus === 'CANCELED' ? 'bg-btn-secondary bg-opacity-30' : ''
                                }`}
                            >
                                <IoCheckmark
                                    className={`w-5 h-5 font-bold ${
                                        currentOrder?.orderStatus === 'CANCELED' ? 'inline-block' : 'hidden'
                                    }`}
                                />{' '}
                                Cancel Order
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}

export default OrdersPageContainer