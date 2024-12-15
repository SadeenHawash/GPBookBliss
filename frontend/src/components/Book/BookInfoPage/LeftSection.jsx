import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GoPencil } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { checkBookStatus, moveBookBetweenLists, addBookToList } from '@/APIServices/ReadingList/readingListAPI';
import ReadingListDialog from './ReadingListDialog';
import axios from 'axios';

const LeftSection = ({ data }) => {
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);
    const [currentList, setCurrentList] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const bookId = data?._id;

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const status = await checkBookStatus(bookId);
                if (status) {
                    setAdded(true);
                    setCurrentList(status);
                }
            } catch (error) {
                console.error('Error checking book status:', error);
            }
        };

        checkStatus();
    }, [bookId]);
    
    const handleMoveToList = async (toList) => {
        try {
            if (!added) {
                await addBookToList(bookId, toList);
            } else {
                await moveBookBetweenLists(bookId, toList);
            }
            setCurrentList({ status: toList }); // Update currentList state to reflect the new status
            if (toList === 'wantToRead') toast.success(`Shelved as Want to read`);
            else if (toList === 'currentlyReading') toast.success(`Shelved as Currently reading`);
            else if (toList === 'finishedReading') toast.success(`Shelved as Finished reading`);
            navigate('/profile/bookshelves/all');
        } catch (error) {
            console.error('Error moving book between lists:', error);
            toast.error('Error moving book between lists');
        }
    };
    const handleAddToCart = async () => {
        try {
            const response = await axios.post(`/api/cart/${data?._id}`, {
                quantity: 1,
            });
            console.log('Added to cart:', response.data);
            toast.success("Added to cart");
            navigate('/cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
            // Handle error state or feedback to the user
        }
    };

    const pdfUrl = data?.pdf;
    const handleViewPDF = () => {
        navigate('/view-pdf', { state: { pdfUrl } });
    };

    return (
        <div className='w-1/3 mb-10 max-[900px]:w-full flex justify-center'>
            <div className='flex flex-col gap-2'>
                <div className="p-4 relative rounded-tr-lg rounded-br-lg" style={{ height: 330, width: 220 }}>
                    <img
                        className="book w-full h-full object-cover rounded-tr-lg rounded-br-lg"
                        src={data?.image}
                        alt="Book cover"
                    />
                </div>
                <div className='flex flex-col gap-2 justify-center content-center '>
                    <div>
                        <button
                            type="button"
                            className={`w-full py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary ${added ? 'border border-primary' : 'bg-primary py-[10px]'}`}
                            onClick={() => setDialogOpen(true)}
                        >
                            {added ? (
                                    <div className='flex gap-2 justify-center'>
                                        <GoPencil className='text-lg text-primary' />
                                        <div>{currentList.status === 'wantToRead' ? 'Want to read' : currentList.status === 'currentlyReading' ? 'Currently reading' : currentList.status === 'finishedReading' ? 'Finished reading' : 'Want to read'}</div>
                                    </div>
                                ) : (
                                    <div className='flex gap-2 justify-center text-secondary'>
                                        <div>Want to read</div>
                                    </div>
                                )}
                        </button>
                    </div>
                    <div>
                        {data?.quantity > 0 ?
                            <button
                                onClick={handleAddToCart}
                                type="button"
                                className={`w-full py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary`}
                            >
                                Add to cart
                            </button>
                            :
                            <button
                                type="button"
                                className={`w-full py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary`}
                            >
                                Sold Out
                            </button>
                        }
                    </div>
                    {/* <div>
                        <button onClick={handleViewPDF}>View PDF</button>
                    </div> */}
                </div>
            </div>
            <ReadingListDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleMoveToList}
                currentList={currentList}
            />
        </div>
    );
};

export default LeftSection;

