import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider, Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import LibraryNav from '../LibraryNav';
import { deleteGenreAPI, getAllGenresAPI, updateGenreAPI } from '@/APIServices/categories/categoriesAPI';
import { RiEditFill } from 'react-icons/ri';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

export default function LibraryCategoriesPageContainer () {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentGenre, setCurrentGenre] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    const handleClickOpen = (genre) => {
        setCurrentGenre(genre);
        setUpdatedName(genre.name);
        setUpdatedDescription(genre.description);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateGenre = async () => {
        try {
            await updateGenreAPI(currentGenre.id, { name: updatedName, description: updatedDescription });
            fetchGenres(); // Refresh the genre list after updating
            handleClose();
        } catch (error) {
            console.error('Error updating genre:', error);
        }
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            className: 'genresColumn',
            renderCell: (params) => <div className='mr-3'>{params.value}</div>,
        },
        { 
            field: 'description', 
            headerName: 'Description', 
            width: 750,
            renderCell: (params) =>
                <div
                    dangerouslySetInnerHTML={{
                        __html: params.value,
                    }}
                />,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 70,
            renderCell: (params) => (
                <button className='flex justify-center pt-4 pl-3' onClick={() => handleClickOpen(params.row)}>
                    <RiEditFill className='cursor-pointer w-5 h-5 text-primary hover:text-red-500' />
                </button>
            )
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

    const fetchGenres = async () => {
        try {
            const genres = await getAllGenresAPI();
            const formattedGenres = genres.map((genre) => ({
                id: genre._id,
                name: genre.name,
                description: genre.description,
            }));
            setRows(formattedGenres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleDelete = async (genreId) => {
        try {
            await deleteGenreAPI(genreId);
            setRows((prevRows) => prevRows.filter((row) => row.id !== genreId));
        } catch (error) {
            console.error('Error deleting genre:', error);
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
                <LibraryNav />
                <div className="w-full flex justify-center rounded-full ">
                    <div style={{ height: 400, width: '98%' }} className="box rounded-2xl">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            pagination
                            rowsPerPageOptions={[5, 10, 20]}
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
                            {updatedName}
                        </div>
                        <ReactQuill
                            value={updatedDescription}
                            onChange={(value) => setUpdatedDescription(value)}
                            className="h-28 text-primary rounded-lg mb-10"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" sx={{ color: '#6f4e37' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateGenre} color="primary" sx={{ color: '#6f4e37' }}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}
