import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { createPostAPI } from '../../../../../APIServices/posts/postsAPI'
import toast from 'react-hot-toast';
import { FaTimesCircle } from 'react-icons/fa';
import LoadingSpinner from '../../../../LoadingSpinner';


const CreatePostForm = () => {
    //state for wysiwg
    const [description, setDescription] = useState('');
    //File upload state
    const [imageError, setImageErr] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    //post mutation 
    const postMutation = useMutation({
        mutationKey: ['create-post'],
        mutationFn: createPostAPI,
        onSuccess: () => {
            toast.success('Post created successfully');
            formik.resetForm();
            setImagePreview(null);
        }
    })
    const formik = useFormik({
        initialValues: {
            description: '',
            image: '',
        },
        validationSchema: Yup.object({
            description: Yup.string().required('Description is required'),
            image: Yup.string().required('image is required'),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("description", description);
            formData.append("image", values.image);
            postMutation.mutate(formData);
        }
    });
    //!===== File upload logics====
    //! Handle fileChange
    const handleFileChange = (event) => {
        //get the file selected
        const file = event.currentTarget.files[0];
        //Limit file size
        if (file.size > 1048576) {
            setImageErr("File size exceed 1MB");
            return;
        }
        // limit the file types
        if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
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
    //get loading state
    const isLoading = postMutation.isPending;
    console.log("mutation", postMutation);
    return (
        <div className="w-full h-[115vh] container flex content-center justify-center bg-background">
        <div className="absolute top-14 mb-4 max-w-lg w-full bg-btn-secondary  bg-opacity-10 rounded-xl shadow-md p-8 m-4">
            <h2 className="text-2xl font-bold text-center text-primary mb-8">
            Add New Post
            </h2>
            {/* {isError && <AlertMessage type="error" message={errorMsg} />} */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Description Input - Using ReactQuill for rich text editing */}
            <div className="mb-10">
                <label
                htmlFor="description"
                className="block text-sm font-bold pb-1 text-primary"
                >
                Description
                </label>
                <ReactQuill
                value={formik.values.description}
                onChange={(value) => {
                    setDescription(value);
                    formik.setFieldValue("description", value);
                }}
                className="h-40 text-primary rounded-lg"
                />
                {/* display err msg */}
                {formik.touched.description && formik.errors.description && (
                <span className='text-red-600 ml-3'>{formik.errors.description}</span>
                )}
            </div>

            {/* Image Upload Input - File input for uploading images */}
            <div className="flex flex-col items-center justify-center bg-divider-color bg-opacity-30 p-4 shadow">
                <label
                htmlFor="images"
                className="block text-sm font-medium text-primary mb-2"
                >
                Upload Image
                </label>
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
                    className="cursor-pointer py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-btn-primary hover:bg-opacity-90 text-primary"
                >
                    Choose a file
                </label>
                </div>
                
                {formik.touched.image && formik.errors.image && (
                <p className="text-sm text-red-600">{formik.errors.image}</p>
                )}
                
                {imageError && <p className="text-sm text-red-600">{imageError}</p>}
                {imagePreview && (
                <div className="mt-2 relative">
                    <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-32 w-[300px] object-cover rounded-md"
                    />
                    <button
                    onClick={removeImage}
                    className="absolute right-0 top-2 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0"
                    >
                    <FaTimesCircle className="text-red-500" />
                    </button>
                </div>
                )}
            </div>

            {/* Submit Button - Button to submit the form */}
            <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-btn-primary hover:bg-opacity-90 text-primary"
                disabled={isLoading}
            >
                {isLoading ? <LoadingSpinner size='xs' /> : "Add Post"}
            </button>
            </form>
        </div>
        </div>
    )
}

export default CreatePostForm