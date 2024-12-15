import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { IoCheckmark, IoClose, IoTrashSharp } from 'react-icons/io5';

const ReadingListDialog = ({ open, onClose, onSave, currentList }) => {
    const handleSave = (toList) => {
        onSave(toList);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '15px',
                    padding: '10px',
                    backgroundColor: '#f2eae2',
                    color: '#6f4e37',
                },
            }}
            className='font-serif'
        >
            <IoClose 
                className='absolute top-2 right-3 cursor-pointer w-5 h-5'
                onClick={onClose}
            />
            <div className='text-xl font-bold px-3 pt-3 pb-0 font-serif mt-3'>Choose a shelf for this book</div>
            <DialogContent className='flex flex-col justify-center items-center gap-2'>
                <button 
                    className={`w-[90%] flex justify-center gap-1 py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary
                        ${currentList === 'wantToRead'? ' bg-btn-secondary bg-opacity-30' : ''}`}
                    onClick={() => handleSave('wantToRead')}>
                    <IoCheckmark className={`w-5 h-5 font-bold ${currentList === 'wantToRead'? 'inline-block' : 'hidden'}`}/> Want to Read
                </button>
                <button
                    className={`w-[90%] flex justify-center gap-1 py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary
                        ${currentList === 'currentlyReading'? ' bg-btn-secondary bg-opacity-30' : ''}`}
                    onClick={() => handleSave('currentlyReading')}>
                    <IoCheckmark className={`w-5 h-5 font-bold ${currentList === 'currentlyReading'? 'inline-block' : 'hidden'}`}/> Currently Reading
                </button>
                <button 
                    className={`w-[90%] flex justify-center gap-1 py-2 px-4 rounded-full shadow-md text-sm font-bold text-primary border border-primary
                        ${currentList === 'finishedReading'? ' bg-btn-secondary bg-opacity-30' : ''} `}
                    onClick={() => handleSave('finishedReading')}>
                    <IoCheckmark className={`w-5 h-5 font-bold ${currentList === 'finishedReading'? 'inline-block' : 'hidden'}`}/> Finished Reading
                </button>
                <button 
                    className='w-[90%] flex gap-2 py-2 px-4 mt-3 text-sm font-bold text-primary'
                    onClick={() => handleSave('finishedReading')}>
                    <IoTrashSharp className='w-5 h-5'/> Remove from my shelf
                </button>
            </DialogContent>
        </Dialog>
    );
};

export default ReadingListDialog;


// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// const ReadingListDialog = ({ open, onClose, onSave, currentList }) => {
//     const [selectedList, setSelectedList] = useState(currentList);

//     const handleSave = () => {
//         onSave(selectedList);
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose}>
//             <DialogTitle className=' text-3xl'>Choose a shelf for this book</DialogTitle>
//             <DialogContent>
//                 <RadioGroup
//                     value={selectedList}
//                     onChange={(e) => setSelectedList(e.target.value)}
//                 >
//                     <FormControlLabel value="wantToRead" control={<Radio />} label="Want to Read" />
//                     <FormControlLabel value="currentlyReading" control={<Radio />} label="Currently Reading" />
//                     <FormControlLabel value="finishedReading" control={<Radio />} label="Finished Reading" />
//                 </RadioGroup>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose}>Cancel</Button>
//                 <Button onClick={handleSave} color="primary">Save</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default ReadingListDialog;
