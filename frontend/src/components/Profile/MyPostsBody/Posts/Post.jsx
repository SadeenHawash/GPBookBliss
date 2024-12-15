import React, { useState } from 'react'
import '../Posts/postCss.css'
import { FaRegBookmark, FaRegComment, FaRegHeart, FaTrash } from 'react-icons/fa';
import { BiRepost } from 'react-icons/bi';
import { format, formatDistanceToNow } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../../LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Flex, Icon } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import useAuthUser from '@/hooks/authentication/useAuthUser';
import { useAuthContext } from '@/context/authContext';

const Post = ({post}) => {
    //const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });
    //const { authUser, isLoading } = useAuthUser();
    const {authUser} = useAuthContext();
    const queryClient = useQueryClient();
    //const postOwner = post.user;
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    //const isMyPost = authUser._id === post.user._id;

    // if (isLoading || !authUser) {
    //     return <LoadingSpinner size='lg' />;
    //     console.log("error in authUser");
    // }

    const isLiked = post.likes.includes(authUser._id);

    const { mutate: likePost, isPending: isLiking } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch(`/api/posts/like/${post._id}`, {
					method: "POST",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: (updatedLikes) => {
			// this is not the best UX, bc it will refetch all posts
			queryClient.invalidateQueries({ queryKey: ["list-posts"] });
			// instead, update the cache directly for that post
			queryClient.setQueryData(["list-posts"], (oldData) => {
                if (!Array.isArray(oldData)) {
                    return oldData;
                }
                return oldData.map((p) => {
                    if (p._id === post._id) {
                        return { ...p, likes: updatedComments };
                    }
                    return p;
                });
            });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
    const { mutate: commentPost, isPending: isCommenting } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch(`/api/posts/comment/${post._id}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ content: comment }),
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: (updatedComments) => {
			toast.success("Comment posted successfully");
			setComment("");
			queryClient.invalidateQueries({ queryKey: ["list-posts"] });

            queryClient.setQueryData(["list-posts"], (oldData) => {
                if (!Array.isArray(oldData)) {
                    return oldData;
                }
                return oldData.map((p) => {
                    if (p._id === post._id) {
                        return { ...p, comments: updatedComments };
                    }
                    return p;
                });
            });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
    const { mutate: deletePost, isPending: isDeleting } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch(`/api/posts/${post._id}`, {
					method: "DELETE",
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Post deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["list-posts"] });
		},
	});

	const handlePostComment = (e) => {
		e.preventDefault();
		if (isCommenting) return;
		commentPost();
	};
    const handleLikePost = () => {
		if (isLiking) return;
		likePost();
	};
    const toggleComments = () => {
        setShowComments(!showComments);
    };
    const handleDeletePost = () => {
		deletePost();
	};

    return (
        <div className="w-full md:w-1/2 p-2 px-3 my-4">
            {/* <Link to={`/posts/${post._id}`}></Link> */}
                <div className="relative md:left-1/2 bg-background-secondary bg-opacity-10 border border-btn-secondary hover:border-primary transition duration-200 rounded-2xl h-full p-3">
                    <div className={`cursor-pointer mx-4`}>
                        <div className='relative flex items-center gap-4 max-[280px]:gap-3 py-2 mb-3'>
                            <div className='avatar z-0'>
                                <div className='w-10 max-[280px]:w-8 rounded-full ring-2 ring-primary'>
                                    <img src='https://avatar.iran.liara.run/public'
                                    alt='user avatar' />
                                </div>
                            </div>
                            <div className='flex-col sm:inline-block'>
                                <div className='font-bold text-sm text-primary min-[815px]:text-[18px]'>
                                    {post?.user?.fullName}
                                </div>
                                <div className='flex pt-1 gap-5 text-btn-secondary'>
                                    <span className='text-[11px] ellipsis'>
                                        {new Date(post.createdAt).toDateString() === new Date().toDateString() ?
                                        `${formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}`
                                        : `${format(new Date(post.createdAt), 'MMM d, yyyy')}`
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4">
                        <div
                            className="mb-4 text-primary"
                            dangerouslySetInnerHTML={{
                                __html: post?.description,
                            }}
                        />
                    </div>
                    {post?.image ?
                        <div className="relative mb-3" style={{ height: 240 }}>
                            <div className="absolute top-0 left-0 z-10"></div>
                            <div className="absolute bottom-0 right-0 z-10"></div>
                            {/*post image */}
                            <img
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                src={post?.image?.path}
                                alt={post?.description}
                            />
                        </div>
                    : <></>}
                    <div className='flex justify-between mt-3 px-2'>
                        <div className='flex gap-4 items-center w-2/3 justify-between'>
                            <div
                                className='flex gap-1 items-center cursor-pointer group'
                                //onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
                                onClick={toggleComments}
                            >
                                <FaRegComment className='w-4 h-4  text-primary group-hover:text-primary' />
                                {post.comments.length > 0 && <span className='text-sm text-primary group-hover:text-primary'>
                                    {post.comments.length}
                                </span>}
                            </div>
                            <div className='flex gap-1 items-center group cursor-pointer'>
                                <BiRepost className='w-6 h-6  text-primary group-hover:text-primary' />
                                <span className='text-sm text-primary group-hover:text-primary'> </span>
                            </div>
                            <div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
                                {isLiking && <LoadingSpinner size='xs' />}
                                {!isLiked && !isLiking && (
                                    <FaRegHeart className='w-4 h-4 cursor-pointer text-primary group-hover:text-pink-500' />
                                )}
                                {isLiked && !isLiking && (
                                    <FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500' />
                                )}
                                {post.likes.length > 0 && <span
                                    className={`text-sm group-hover:text-pink-500 ${ isLiked ? "text-pink-500" : "text-primary"}`}
                                >
                                    {post.likes.length}
                                </span>}
                            </div>
                        </div>
                        <div className='flex w-1/3 justify-end gap-2 items-center'>
                            <FaRegBookmark className='w-4 h-4 text-primary cursor-pointer' />
                        </div>
                    </div>
                    {showComments && (
                    <div className="mt-3 border-t border-divider-color mx-1">
                        {post.comments.length > 0 ? (
                            <div className='overflow-y-auto h-36 pt-1'>
                            {post.comments.map((comment) => (
                                <div className={`cursor-pointe flex-col`}>
                                    <div className='relative flex items-center py-2 overflow-x-hidden'>
                                        <div className='avatar z-0 mx-1 mb-5'>
                                            <div className='w-8 rounded-full ring-2 ring-primary'>
                                                <img src='https://avatar.iran.liara.run/public'
                                                alt='user avatar' />
                                            </div>
                                        </div>
                                        <div className='flex-col'>
                                            <div className='max-[300px]:w-[150px] flex-col inline-block bg-btn-primary p-2 rounded-xl mx-1'>
                                                <div className='flex font-bold text-xs text-primary'>
                                                    {comment.commenter.fullName}
                                                    {authUser._id === comment.commenter._id && (
                                                        <span className='flex justify-end flex-1'>
                                                            {!isDeleting && (
                                                                <FaTrash className='ml-2 cursor-pointer text-primary hover:text-red-500' onClick={handleDeletePost} />
                                                            )}
                                                            {isDeleting && <LoadingSpinner size='xs' />}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='text-primary font-normal text-xs mt-2'>
                                                    {comment.content}
                                                </div>
                                            </div>
                                            <div className=' flex justify-between'>
                                                <div className='text-[11px] text-btn-secondary ml-1'>
                                                    {new Date(post.createdAt).toDateString() === new Date().toDateString() ?
                                                    `${formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}`
                                                    : `${format(new Date(comment.createdAt), 'MMM d, yyyy')}`
                                                    }
                                                </div>
                                                <div className='flex mr-3'>
                                                    {isLiking && <LoadingSpinner size='xs' />}
                                                    {!isLiked && !isLiking && (
                                                        <FaRegHeart className='w-3 h-3 mt-1 cursor-pointer text-primary group-hover:text-pink-500' />
                                                    )}
                                                    {isLiked && !isLiking && (
                                                        <FaRegHeart className='w-3 h-3 mt-1 cursor-pointer text-pink-500' />
                                                    )}
                                                    {post.likes.length > 0 && <span
                                                        className={`text-xs mt-[2px] ml-1 group-hover:text-pink-500 ${ isLiked ? "text-pink-500" : "text-primary"}`}
                                                    >
                                                        {post.likes.length}
                                                    </span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        ) : (
                            <div className="p-2">
                                <p className="text-primary my-2 text-sm">No comments yet 🤔 Be the first one 😉</p>
                            </div>
                        )}

                        <form onSubmit={handlePostComment}>
                            <Flex
                                as="label"
                                className='input h-10 max-[280px]:h-10 rounded-3xl input-bordered bg-transparent flex items-center gap-2 border-primary focus:border-primary hover:bg-transparent hover:border-primary'
                                alignItems="center"
                                position="relative"
                            >
                                <input
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    //className="w-full bg-transparent p-2 px-4 mt-2 text-sm border border-primary rounded-full text-primary placeholder:text-btn-secondary placeholder:text-sm"
                                    placeholder="Write a comment..."
                                    variant="unstyled"
                                    flex="1"
                                    className='overflow-x-auto w-full text-sm text-primary placeholder:text-btn-secondary placeholder:text-sm'
                                />
                                {!isCommenting && (
                                    <Icon
                                        as={FontAwesomeIcon}
                                        icon={faPaperPlane}
                                        position="absolute"
                                        right="1rem"
                                        top="0.75rem"
                                        w="4"
                                        h="4"
                                        color="#6f4e37"
                                        cursor="pointer"
                                        type='submit'
                                        onClick={handlePostComment}
                                    />
                                )}
                                {isCommenting && <LoadingSpinner size='xs' />}
                            </Flex>
                        </form>
                    </div>
                )}
                </div>
        </div>
    )
}

export default Post
