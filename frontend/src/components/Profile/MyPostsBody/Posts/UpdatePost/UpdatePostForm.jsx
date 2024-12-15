import React from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom';
import { fetchPost, updatePostAPI } from '../../../../../APIServices/posts/postsAPI';
import { useMutation, useQuery } from '@tanstack/react-query';

const UpdatePostForm = () => {
    const { postId } = useParams();
    const { data } = useQuery({
        queryKey: ['post-details', postId],
        queryFn: () => fetchPost(postId)
    });
    const postMutation = useMutation({
        mutationKey: ['update-post'],
        mutationFn: updatePostAPI
    })
    const formik = useFormik({
        initialValues: {
            title: data?.postFounded?.title || '',
            description: data?.postFounded?.description || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values) => {
            const postData = {
                postId,
                title: values.title,
                description: values.description
            }
            postMutation.mutate(postData);
        }
    });
    //get loading state
    const isLoading = postMutation.isPending;
    // isError
    const isError = postMutation.isError;
    // isSuccess
    const isSuccess = postMutation.isSuccess;
    // error
    const error = postMutation.error;
    return (
        <div className="w-full container pt-16 pb-4 flex flex-col content-center items-center justify-center bg-background">
            <h1>You are editing - {data?.postFounded.title} -</h1>
            <div>
                {isSuccess && <p>Post Updated Successfully</p>}
                {isError && <p>{error.message}</p>}
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="w-full px-3 mb-6">
                    <input type="text" name='title' placeholder="Enter Title" 
                    {...formik.getFieldProps('title')}
                    />
                    {/* display error message */}
                    {formik.touched.title && formik.errors.title && (
                        <span className="text-red-500 text-xs italic">{formik.errors.title}</span>
                    )}
                    <input type="text" name='Description' placeholder="Description" 
                    {...formik.getFieldProps('description')}
                    />
                    {/* display error message */}
                    {formik.touched.description && formik.errors.description && (
                        <span className="text-red-500 text-xs italic">{formik.errors.description}</span>
                    )}
                    <button type='submit' disabled={isLoading}>
                        {isLoading ? <span className='spinner-border spinner-border-sm'></span> : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePostForm;
