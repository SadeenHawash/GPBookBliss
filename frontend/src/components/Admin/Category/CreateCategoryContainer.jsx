import React from 'react';
import ReactQuill from 'react-quill';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { createGenreAPI } from '@/APIServices/categories/categoriesAPI';
import AlertMessage from '@/Alert/AlertMessage';

const CreateCategoryContainer = () => {
    const categoryMutation = useMutation({
        mutationKey: ['add-category'],
        mutationFn: createGenreAPI,
        onSuccess: () => {
            formik.resetForm();
            // setDescription(''); // Remove this if not needed
        },
        onError: (error) => {
            console.error('Error creating category:', error);
        }
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            description: Yup.string().required('Description is required'),
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: (values) => {
            console.log('Submitting form with values:', values); // Add log
            categoryMutation.mutate(values);
        }
    });

    return (
        <div className="w-full h-screen container flex content-center justify-center bg-background">
            <div className="absolute mt-20 mb-4 max-w-lg w-full bg-btn-secondary bg-opacity-10 rounded-xl shadow-md p-8 m-4">
                <h2 className="text-2xl font-bold text-center text-primary mb-4">
                    Add Category
                </h2>
                {categoryMutation.isPending && (
                    <AlertMessage type="loading" message="Loading please wait" />
                )}
                {categoryMutation.isSuccess && (
                    <AlertMessage
                        type="success"
                        message="Category created successfully"
                    />
                )}
                {categoryMutation.isError && (
                    <AlertMessage
                        type="error"
                        message={categoryMutation?.error?.response?.data?.message || 'An error occurred'}
                    />
                )}
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="mb-10">
                        <label
                            htmlFor="categoryName"
                            className="block text-sm font-bold text-primary"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...formik.getFieldProps("name")}
                            className="block w-full text-sm px-1 py-1 my-1 bg-transparent border-b border-divider-color text-primary placeholder-btn-secondary focus:outline-none "
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-red-600 text-xs ml-2">{formik.errors.name}</span>
                        )}
                        <label
                            htmlFor="description"
                            className="block text-sm font-bold pb-1 mt-3 mb-1 text-primary"
                        >
                            Story Description
                        </label>
                        <ReactQuill
                            value={formik.values.description}
                            onChange={(value) => formik.setFieldValue("description", value)}
                            className="h-20 text-primary rounded-lg"
                        />
                        {formik.touched.description && formik.errors.description && (
                            <span className='text-red-600 text-xs ml-2'>{formik.errors.description}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-btn-primary hover:bg-opacity-90 text-primary"
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateCategoryContainer;