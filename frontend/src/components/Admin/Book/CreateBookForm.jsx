import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import ReactQuill from 'react-quill'
import { FaFilePdf, FaPlus } from 'react-icons/fa6';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { fetchGenresAPI } from '@/APIServices/categories/categoriesAPI';
import { createBookAPI } from '@/APIServices/Books/booksAPI';
import toast from 'react-hot-toast';

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '100%',
        fontSize: '0.875rem',
        backgroundColor: 'transparent', // equivalent to bg-transparent
        borderBottom: '1px solid #eaded0', // adjust color as needed, equivalent to border-b border-divider-color
        color: '#6F4E37', // equivalent to text-primary
        borderColor: 'transparent', // prevents the default border from showing
        boxShadow: 'none',
        '&:hover': {
            borderColor: 'none', // optional hover effect if needed
        },
        '&:focus': {
            outline: 'none', // equivalent to focus:outline-none
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#e3d3bf',
        border: 'none',
        color: '#6F4E37',
        marginBottom: '1rem',
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '14px',
        backgroundColor: state.isSelected ? ' transparent' : '#e3d3bf',
        color: state.isSelected ? '#FEF6E1' : '#6F4E37', // equivalent to text-primary
        '&:hover': {
            backgroundColor: '#f5efe9', // optional hover effect if needed
        },
    }),
    multiValue: (provided) => ({
        ...provided,
        borderRadius: '0.6rem', 
        backgroundColor: '#e3d3bf', // adjust color as needed
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#6F4E37', // equivalent to text-primary
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        borderTopRightRadius: '0.5rem', 
        borderBottomRightRadius: '0.5rem',
        color: '#6F4E37', // equivalent to text-primary
        ':hover': {
            backgroundColor: 'red', // optional hover effect if needed
            color: 'white',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#C19A6B', // equivalent to placeholder-btn-secondary
    }),
    input: (provided) => ({
        ...provided,
        color: '#6F4E37', // equivalent to text-primary
    }),
};

const CreateBookForm = () => {
    //state for wysiwg
    const [description, setDescription] = useState('');
    //File upload state
    const [imageError, setImageErr] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [pdfFile, setPdfFile] = useState("");
    const animatedComponents = makeAnimated();
    const [genres, setGenres] = useState([]);

    //get categories
    useEffect(() => {
        const fetchGenres = async () => {
            const genresData = await fetchGenresAPI();
            setGenres(genresData);
        };
    
        fetchGenres();
    }, []); 

    //post mutation 
    const bookMutation = useMutation({
        mutationKey: ['add-book'],
        mutationFn: createBookAPI,
        onSuccess: () => {
            toast.success('Book Added Successfully');
            formik.resetForm();
            setDescription('');
            setImagePreview(null);
            setPdfFile('');
        },
        onError: () => {
            toast.error('Something went wrong');
        }
    })
    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            publishedDate: '',
            numberOfPages: '',
            genres: [],
            price: '',
            discount: '',
            quantity: '',
            image: null,
            pdf: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            author: Yup.string().required('Author is required'),
            publishedDate: Yup.date().required('Published Date is required'),
            numberOfPages: Yup.number().required('Number of Pages is required'),
            price: Yup.number().required('Price is required'),
            discount: Yup.number().required('Discount is required'),
            quantity: Yup.number().required('Quantity is required'),
            image: Yup.string().required('Image is required'),
            pdf: Yup.string().required('PDF is required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('author', values.author);
            formData.append('publishedDate', values.publishedDate);
            formData.append('numberOfPages', values.numberOfPages);
            formData.append('description', description);
            formData.append('genres', JSON.stringify(values.genres.map((genre) => genre.value)));
            formData.append('price', values.price);
            formData.append('discount', values.discount);
            formData.append('quantity', values.quantity);
            // Append files only if they exist
            if (values.image) formData.append('image', values.image);
            if (values.pdf) formData.append('pdf', values.pdf);

            bookMutation.mutate(formData);
        },
    });
    //!===== File upload logics====
    //! Handle fileChange
    const handleFileChange = (event) => {
        //get the file selected
        const file = event.currentTarget.files[0];
        //Limit file size
        if (file.size > 4194304) {
            setImageErr("File size exceed 4MB");
            return;
        }
        // limit the file types
        if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
            setImageErr("Invalid file type");
        }
        //set the image preview
        formik.setFieldValue("image", file);
        setImagePreview(URL.createObjectURL(file));
    };
    //!remove image
    const removeImage = () => {
        formik.setFieldValue("image", null);
        setImagePreview(null);
    };
    //!upload pdf
    const handlePdfChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        // Perform validation if needed
        if (file && file.type !== 'application/pdf') {
            console.log('Please select a PDF file.');
            return;
        }
        console.log('Selected PDF file:', file);
        // Update state with the selected file
        formik.setFieldValue("pdf", file);
        setPdfFile(file);
    };
    const isLoading = bookMutation.isPending;
    console.log("mutation", bookMutation);
    return (
        <div className='relative container w-full'>
            <div className='relative border-b mb-1 border-divider-color'>
                <div className='flex justify-between px-2 pt-1'>
                    <div className='py-1 text-primary text-2xl font-bold'>
                        Add Book
                    </div>
                </div>
            </div>
            <form className='flex flex-col h-[90%]' onSubmit={formik.handleSubmit}>
                <div className='flex h-full gap-2'>
                    <div className='w-[70%] flex flex-col gap-2'>
                        {/* general info */}
                        <div className='flex flex-col h-3/4 p-3 bg-btn-secondary bg-opacity-10 shadow-sm rounded-lg text-primary'>
                            <p className='text-primary text-md font-bold'> General Information </p>
                            <div className='flex flex-col p-4 gap-[10px]'>
                                <div className='flex gap-4'>
                                    <div className='flex flex-col w-1/2'>
                                        <label
                                            htmlFor="title"
                                            className="block text-xs font-bold text-primary"
                                        >
                                            Book Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            placeholder="Book Title"
                                            {...formik.getFieldProps("title")}
                                            className="block w-full text-sm px-1 py-1 my-1 bg-transparent border-b border-divider-color text-primary placeholder-btn-secondary focus:outline-none "
                                        />
                                        {formik.touched.title && formik.errors.title && (
                                            <span className="text-red-600 text-xs ml-2">{formik.errors.title}</span>
                                        )}
                                    </div>
                                    <div className='flex flex-col w-1/2'>
                                        <label
                                            htmlFor="author"
                                            className="block text-xs font-bold text-primary"
                                        >
                                            Author's Name
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            placeholder="The name of the book author"
                                            {...formik.getFieldProps("author")}
                                            className="block w-full text-sm px-1 py-1 my-1 bg-transparent border-b border-divider-color text-primary placeholder-btn-secondary focus:outline-none "
                                        />
                                        {formik.touched.author && formik.errors.author && (
                                            <span className="text-red-600 text-xs ml-2">{formik.errors.author}</span>
                                        )}
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex flex-col w-1/2'>
                                        <label
                                            htmlFor="publishedDate"
                                            className="block text-xs font-bold text-primary"
                                        >
                                            Published Date
                                        </label>
                                        <input
                                            type="date"
                                            id="publishedDate"
                                            placeholder="Published Date"
                                            {...formik.getFieldProps("publishedDate")}
                                            className="block w-full text-sm px-1 py-1 my-1 bg-transparent border-b border-divider-color text-primary placeholder-btn-secondary focus:outline-none "
                                        />
                                        {formik.touched.publishedDate && formik.errors.publishedDate && (
                                            <span className="text-red-600 text-xs ml-2">{formik.errors.publishedDate}</span>
                                        )}
                                    </div>
                                    <div className='flex flex-col w-1/2'>
                                        <label
                                            htmlFor="numberOfPages"
                                            className="block text-xs font-bold text-primary"
                                        >
                                            Number Of Pages
                                        </label>
                                        <input
                                            type="number"
                                            id="numberOfPages"
                                            placeholder="Number of pages"
                                            {...formik.getFieldProps("numberOfPages")}
                                            className="block w-full text-sm px-1 py-1 my-1 bg-transparent border-b border-divider-color text-primary placeholder-btn-secondary focus:outline-none "
                                        />
                                        {formik.touched.numberOfPages && formik.errors.numberOfPages && (
                                            <span className="text-red-600 text-xs ml-2">{formik.errors.numberOfPages}</span>
                                        )}
                                    </div>
                                </div>
                                <label
                                    htmlFor="genres"
                                    className="block text-xs font-bold text-primary"
                                >
                                    Book Categories
                                </label>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={genres}
                                    styles={customStyles}
                                    value={formik.values.genres}
                                    onChange={(selected) => formik.setFieldValue('genres', selected)}
                                />
                                <div className='h-20'>
                                    <label
                                        htmlFor="description"
                                        className="block text-xs font-bold pb-1 mb-1 text-primary"
                                    >
                                        Book Description
                                    </label>
                                    <ReactQuill
                                        value={description}
                                        onChange={setDescription}
                                        placeholder="Short description of the book"
                                        className="h-12 text-primary rounded-lg placeholder-btn-secondary"
                                    />
                                    {/* display err msg */}
                                    {/* {formik.touched.description && formik.errors.description && (
                                        <span className='text-red-600 text-xs ml-2'>{formik.errors.description}</span>
                                    )} */}
                                </div>
                            </div>
                        </div>
                        {/* pricing */}
                        <div className='h-1/4 p-3 bg-btn-secondary bg-opacity-10 shadow-sm rounded-lg text-primary'>
                            <p className='text-primary text-md font-bold'> Pricing And Stock </p>
                            <div className='flex p-4 gap-3'>
                                <div className='flex flex-col w-1/3'>
                                    <label
                                        htmlFor="price"
                                        className="block text-xs font-bold text-primary"
                                    >
                                        Base Pricing
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        placeholder="Book Price"
                                        {...formik.getFieldProps("price")}
                                        className="block w-full text-sm px-1 py-1 my-1 bg-transparent border-b border-divider-color text-primary placeholder-btn-secondary focus:outline-none "
                                    />
                                    {formik.touched.price && formik.errors.price && (
                                        <span className="text-red-600 text-xs ml-2">{formik.errors.price}</span>
                                    )}
                                </div>
                                <div className='flex flex-col w-1/3'>
                                <label
                                    htmlFor="discount"
                                    className="block text-xs font-bold text-primary"
                                >
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    id="discount"
                                    placeholder="Discount Amount  % "
                                    {...formik.getFieldProps("discount")}
                                    className="block w-full text-sm px-1 py-1 my-1 bg-transparent border-b border-divider-color text-primary placeholder-btn-secondary focus:outline-none "
                                />
                                {formik.touched.discount && formik.errors.discount && (
                                    <span className="text-red-600 text-xs ml-2">{formik.errors.discount}</span>
                                )}
                                </div>
                                <div className='flex flex-col w-1/3'>
                                <label
                                    htmlFor="quantity"
                                    className="block text-xs font-bold text-primary"
                                >
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    placeholder="Quantity"
                                    {...formik.getFieldProps("quantity")}
                                    className="block w-full text-sm px-1 py-1 my-1 bg-transparent border-b border-divider-color text-primary placeholder-btn-secondary focus:outline-none "
                                />
                                {formik.touched.quantity && formik.errors.quantity && (
                                    <span className="text-red-600 text-xs ml-2">{formik.errors.quantity}</span>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* uploading */}
                    <div className='w-[30%] flex flex-col gap-1 p-3 text-primary bg-btn-secondary bg-opacity-15 rounded-lg'>
                        <p className='text-primary text-md font-bold'> Uploads </p>
                        <div className='flex flex-col gap-5 h-full py-2'>
                            {/* Book Cover */}
                            <div className='h-[74%] uploadFirstCrad rounded-lg justify-center mx-4'>
                                {/* Image Upload Input - File input for uploading images */}
                                {imagePreview && (
                                    <div className="mb-1 relative flex justify-center">
                                        <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-[350px] w-[290px] object-fill rounded-lg z-10"
                                        />
                                        <button
                                        onClick={removeImage}
                                        className="absolute right-1 top-1 z-10 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0"
                                        >
                                        <FaTimesCircle className="text-red-500" />
                                        </button>
                                    </div>
                                )}
                                <div className="flex justify-center items-center w-full">
                                    <input
                                        id="images"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="images"
                                        className="cursor-pointer absolute top-[45%] z-1 justify-center border border-transparent text-2xl font-medium  text-primary"
                                    >
                                        <FaPlus/> 
                                    </label>
                                </div>
                                {formik.touched.image && formik.errors.image && (
                                    <p className="text-sm text-red-600">{formik.errors.image}</p>
                                )}   
                                {imageError && <p className="text-sm text-red-600">{imageError}</p>}
                            </div>
                            {/* Book PDF File */}
                            <div className="h-[26%] flex flex-col items-center uploadFirstCrad rounded-lg justify-center mx-4">
                            {/* Error message for validation */}
                            {formik.touched.pdf && formik.errors.pdf && (
                                <p className="mt-2 text-sm text-red-600">{formik.errors.pdf}</p>
                            )}
                            <div className="flex flex-col gap-3 justify-center items-center">
                                {/* Label for the file input */}
                                <label htmlFor="pdf" className="cursor-pointer flex items-center justify-center w-full">
                                    <span className="text-3xl text-primary">
                                        <FaFilePdf className="mr-2" /> {/* Replace with your PDF icon */}
                                    </span>
                                </label>
                                {/* Actual file input, hidden and triggered by label click */}
                                <input
                                    id="pdf"
                                    type="file"
                                    name="pdf"
                                    accept="application/pdf"
                                    onChange={handlePdfChange}
                                    className={`w-[90%] text-primary font-semibold text-xs
                                            border border-[#6F4E37] file:cursor-pointer 
                                            cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-[#6F4E37]
                                            file:hover:bg-[#6F4E37] file:text-white rounded-2xl
                                            `}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Submit Button - Button to submit the form */}
                <button
                    type="submit"
                    className="absolute top-0 right-4 py-2 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium bg-primary text-btn-primary hover:bg-opacity-90 "
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading..' : 'Add Book'}
                </button>
            </form>
        </div>
    )
}

export default CreateBookForm