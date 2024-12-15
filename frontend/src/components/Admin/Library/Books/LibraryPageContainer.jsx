import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material';
import { deleteBookAPI, getAllBooksAPI } from '@/APIServices/Books/booksAPI';
import { FaTrash } from 'react-icons/fa';
import { RiEditFill } from "react-icons/ri";
import LibraryNav from '../LibraryNav';

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

export default function LibraryPageContainer() {
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'imageTitle',
            headerName: 'Book',
            width: 230,
            renderCell: (params) => (
                <div className='ml-2' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={params.row.image} alt={params.row.title} style={{ width: 50, height: 50, objectFit: 'fill', marginRight: 10 }} />
                    <span>{params.row.title}</span>
                </div>
            ),
        },
        {
            field: 'genres',
            headerName: 'Genres',
            width: 300, 
            className: 'genresColumn', 
            renderCell: (params) => <div className=' mr-3'>{params.value}</div>, 
        },
        { field: 'pages', headerName: 'Pages', width: 80 },
        { field: 'published', headerName: 'Publish Date', width: 130 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'discount', headerName: 'Discount', width: 90 },
        { field: 'quantity', headerName: 'Quantity', width: 90 },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 10,
            renderCell: (params) => 
                <span className='flex justify-center pt-3 pr-3'>
                    <RiEditFill className='cursor-pointer w-6 h-6 text-primary hover:text-red-500' />
                </span> 
        },
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

    const fetchBooks = async () => {
        try {
            const books = await getAllBooksAPI();
            const formattedBooks = books.map((book) => ({
                id: book._id,
                image: book.image, // Assuming image is a URL to the book cover image
                title: book.title,
                author: book.author,
                genres: book.genres.map((genre) => genre.name).join(', '), // Join genre names
                pages: book.numberOfPages,
                published: new Date(book.publishedDate).toLocaleDateString(),
                price: book.price,
                discount: book.discount,
                quantity: book.quantity,
            }));
            setRows(formattedBooks);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        try {
            await deleteBookAPI(bookId);
            // If deletion is successful, fetch updated list of books
            //fetchBooks();
            setRows((prevRows) => prevRows.filter((row) => row.id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='w-full flex flex-col'>
                <div className='relative mx-2 border-b mb-1 border-divider-color'>
                    <div className='flex justify-between px-2 pt-1'>
                        <div className='py-1 text-primary text-2xl font-bold'>
                            Library
                        </div>
                    </div>
                </div>
                <LibraryNav/>
                <div className="w-full flex justify-center rounded-full ">
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
