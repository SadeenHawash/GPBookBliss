import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchAllPosts } from '../../../../APIServices/posts/postsAPI'

import '../Posts/postCss.css'
import Post from './Post';

const ListAllPosts = ({ feedType, username, userId }) => {
    let isPostsError = false;
    let isPostsLoading = false;
    if(isPostsLoading){
        return <div>Loading...</div>
    }
    if(isPostsError){
        return <div>Error loading data</div>
    }
    // const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    //     queryKey: ['list-posts'],
    //     queryFn: fetchAllPosts
    // });
    // const postMutation = useMutation({
    //     mutationKey: ['delete-post'],
    //     mutationFn: deletePostAPI
    // });
    // const deleteHandler = async (postId) => {
    //     postMutation.mutateAsync(postId).then(() => {
    //         refetch();
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
    const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return "/api/posts/all";
			case "following":
				return "/api/posts/following";
			case "posts":
				return `/api/posts/user/${username}`;
			case "likes":
				return `/api/posts/likes/${userId}`;
			default:
				return "/api/posts/all";
		}
	};

	const POST_ENDPOINT = getPostEndpoint();
    const {
		data,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ['list-posts'],
		queryFn: fetchAllPosts
	});

    useEffect(() => {
		refetch();
	}, [feedType, refetch]);

    return (
        <div className='flex-col absolute left-0 w-full z-1 sm:px-9 bg-background mt-12 pt-3'>
            <div className='px-1 mx-auto'>
                <div className="flex-col justify-center flex-wrap mb-10">
                    {data?.posts.map((post) => (
                        <Post key={post._id} post={post}/>
                    ))}
                </div>    
            </div>
        </div>
    )
}

export default ListAllPosts