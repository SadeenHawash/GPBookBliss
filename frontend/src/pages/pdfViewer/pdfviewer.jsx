import React, { useRef, useState, useCallback, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page as ReactPdfPage } from 'react-pdf';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import samplePDF from '../../assets/15-05-2021-052358It-Ends-with-Us.pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useNavigate, useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const width = 500;
const height = 900;
const pagesToRender = 20; // Number of pages to render at once

const Page = React.forwardRef(({ pageNumber }, ref) => (
    <div ref={ref}>
        <ReactPdfPage pageNumber={pageNumber} width={width} />
    </div>
));

    const PdfViewer = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesToDisplay, setPagesToDisplay] = useState([]);
    const numPages = useRef(0);
    const flipBookRef = useRef(null);

    const onDocumentLoadSuccess = ({ numPages: totalNumPages }) => {
        numPages.current = totalNumPages;
        setPagesToDisplay([...Array(pagesToRender).keys()].map((i) => i + 1));
    };

    const handlePageFlip = (pageIndex) => {
        setCurrentPage(pageIndex + 1);
        updateDisplayedPages(pageIndex + 1);
    };

    const handleNextPage = () => {
        if (currentPage < numPages.current) {
        setCurrentPage((prevPage) => {
            const newPage = prevPage + 1;
            updateDisplayedPages(newPage);
            return newPage;
        });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage((prevPage) => {
            const newPage = prevPage - 1;
            updateDisplayedPages(newPage);
            return newPage;
        });
        }
    };

    const updateDisplayedPages = useCallback((pageIndex) => {
        const startPage = Math.max(1, pageIndex - Math.floor(pagesToRender / 2));
        const endPage = Math.min(numPages.current, startPage + pagesToRender - 1);
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
        }
        setPagesToDisplay(pages);
    }, []);

    //book 
    const [book, setBook] = useState(null);
    const { bookId } = useParams();

    useEffect(() => {
        console.log('Book ID:', bookId);
        const loadBook = async () => {
        try {
            const response = await fetch(`/api/books/${bookId}`);
            const book = await response.json();
            setBook(book);
            console.log(book);
        } catch (error) {
            console.error('Error fetching book:', error);
        }
        };
        if (bookId) {
        loadBook();
        }
    }, [bookId]);

    return (
        <div className='w-screen h-screen bg-background absolute top-0 left-0 overflow-hidden flex flex-col justify-center'>
        <div className='absolute top-0 h-14 w-screen text-center flex items-center justify-center bg-btn-secondary bg-opacity-10  border-b border-divider-color'>
            <div className='text-primary flex'>
            <div className='absolute left-0 text-2xl font-bold ml-4 ellipsis-book'>{book?.bookFounded?.title}</div>
            <span className='text-xl'>
                Page {currentPage} of {book?.bookFounded?.numberOfPages}               
            </span>
            <div className='absolute right-0 text-xl font-bold mr-4 mt-1'>
                <FaArrowRight
                className=' cursor-pointer'
                onClick={() => navigate(`/profile/bookshelves/currentlyReading`)}
                />
            </div>
            </div>
        </div>
        <div className='absolute top-14 left-80 flex'>
            <div>
            <FaChevronLeft
                onClick={handlePrevPage}
                className={`cursor-pointer text-primary w-10 h-10 mt-64 mx-10 ${currentPage === 1 ? 'disabled' : ''}`}
            />
            </div>
            <div className='box flex rounded-lg bg-background'>
            <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
                <HTMLFlipBook
                width={width}
                height={height}
                mobileScrollSupport={false}
                ref={flipBookRef}
                currentPage={currentPage - 1}
                onFlip={(e) => handlePageFlip(e.data)}
                >
                {pagesToDisplay.map((pageIndex) => (
                    <Page key={pageIndex} pageNumber={pageIndex} />
                ))}
                </HTMLFlipBook>
            </Document>
            </div>
            <div>
            <FaChevronRight
                onClick={handleNextPage}
                className={`cursor-pointer text-primary w-10 h-10 mt-64 mx-10 ${currentPage === numPages.current ? 'disabled' : ''}`}
            />
            </div>
        </div>
        </div>
    );
};

export default PdfViewer;

