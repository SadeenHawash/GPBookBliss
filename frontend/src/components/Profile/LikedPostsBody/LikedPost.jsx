import React, { useState } from 'react';
import { FaRegBookmark, FaRegComment, FaRegHeart, FaTrash } from 'react-icons/fa';
import { BiRepost } from 'react-icons/bi';
import { format, formatDistanceToNow } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../LoadingSpinner';
import useAuthUser from '../../../hooks/authentication/useAuthUser';
import { RiEditFill } from 'react-icons/ri';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import ReactQuill from 'react-quill';

const LikedPost = ({ post }) => {
    const { authUser } = useAuthUser();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [editedContent, setEditedContent] = useState(post.description);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            console.log("Post deleted successfully");
            queryClient.invalidateQueries("list-posts");
            queryClient.setQueryData("list-posts", (oldData) => {
                if (!Array.isArray(oldData)) {
                    return oldData;
                }
                return oldData.filter((p) => p._id !== post._id);
            });
        },
        onError: (error) => {
            console.error(error.message);
        },
    });

    const handleEditPost = async () => {
        try {
            const res = await fetch(`/api/posts/${post._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description: editedContent }), // Add more fields as needed
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            queryClient.invalidateQueries("list-posts");
            handleClose();
        } catch (error) {
            console.error("Error editing post:", error);
        }
    };

    return (
        <div className="w-full p-2 px-3 my-4">
            <div className="relative bg-background-secondary bg-opacity-10 border border-btn-secondary hover:border-primary transition duration-200 rounded-2xl h-full p-3">
                <div className={`cursor-pointer mx-4`}>
                    <div className='relative flex items-center gap-4 max-[280px]:gap-3 py-2 mb-3'>
                        <div className='avatar z-0'>
                            <div className='w-10 max-[280px]:w-8 rounded-full ring-2 ring-primary'>
                                <img src='https://avatar.iran.liara.run/public' alt='user avatar' />
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
                        {authUser._id === post?.user?._id && (
                            <span className='flex justify-end flex-1 gap-2'>
                                <div>
                                    <RiEditFill className='cursor-pointer pb-1 w-6 h-6 text-primary hover:text-red-500' onClick={handleOpen} />
                                </div>
                                <div>
                                    {!isDeleting && (
                                        <FaTrash className='cursor-pointer text-primary hover:text-red-500' onClick={() => deletePost()} />
                                    )}
                                    {isDeleting && <LoadingSpinner size='sm' />}
                                </div>
                            </span>
                        )}
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
                {post?.image &&
                    <div className="relative mb-3" style={{ height: 240 }}>
                        <img
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            src={post?.image?.path}
                            alt={post?.description}
                        />
                    </div>
                }
                <div className='flex justify-between mt-3 px-2'>
                    <div className='flex gap-4 items-center w-2/3 justify-between'>
                        <div
                            className='flex gap-1 items-center cursor-pointer group'
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
                        <div className='flex gap-1 items-center group cursor-pointer'>
                            <FaRegHeart className='w-4 h-4 cursor-pointer text-primary group-hover:text-pink-500' />
                            {post.likes.length > 0 && <span className='text-sm group-hover:text-pink-500'>
                                {post.likes.length}
                            </span>}
                        </div>
                    </div>
                    <div className='flex w-1/3 justify-end gap-2 items-center'>
                        <FaRegBookmark className='w-4 h-4 text-primary cursor-pointer' />
                    </div>
                </div>
            </div>

            {/* Edit Post Dialog */}
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
                <div className='p-2 text-primary text-2xl font-bold font-serif'>
                    Edit Post
                </div>
                <DialogContent>
                    <ReactQuill
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="h-28 text-primary rounded-lg mb-10"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditPost} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LikedPost;


// import React, { useState } from 'react';
// import '../MyPostsBody/Posts/postCss.css';
// import { FaRegBookmark, FaRegComment, FaRegHeart, FaTrash } from 'react-icons/fa';
// import { BiRepost } from 'react-icons/bi';
// import { format, formatDistanceToNow } from 'date-fns';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import LoadingSpinner from '../../LoadingSpinner';
// import useAuthUser from '../../../hooks/authentication/useAuthUser';
// import { RiEditFill } from 'react-icons/ri';

// const LikedPost = ({ post, show }) => {
//     //const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });
//     const { authUser, isLoading } = useAuthUser();
//     const queryClient = useQueryClient();
//     const postOwner = post.user;
//     console.log("showing: ", show);

//     // const [isExpanded, setIsExpanded] = useState(false);
//     // const toggleReadMore = () => setIsExpanded(!isExpanded);

//     // const maxLength = 300; // Adjust this value to set the maximum length for truncated text

//     // const getDescription = () => {
//     //     if (isExpanded || post.description.length <= maxLength) {
//     //         return post.description;
//     //     }
//     //     return post.description.slice(0, maxLength) + '...';
//     // };

//     if (isLoading || !authUser) {
//         // return <LoadingSpinner size='lg' />;
//         console.log("error in authUser");
//     }

//     const isLiked =  post.likes.includes(authUser._id);
//     const isMyPost = authUser._id === post.user._id;

//     const { mutate: likePost, isPending: isLiking } = useMutation({
//         mutationFn: async () => {
//             try {
//                 const res = await fetch(`/api/posts/like/${post._id}`, {
//                     method: "POST",
//                 });
//                 const data = await res.json();
//                 if (!res.ok) {
//                     throw new Error(data.error || "Something went wrong");
//                 }
//                 return data;
//             } catch (error) {
//                 throw new Error(error);
//             }
//         },
//         onSuccess: (updatedLikes) => {
//             queryClient.invalidateQueries("list-posts");
//             queryClient.setQueryData("list-posts", (oldData) => {
//                 if (!Array.isArray(oldData)) {
//                     return oldData;
//                 }
//                 return oldData.filter((p) => p._id !== post._id);
//             });
//         },
//         onError: (error) => {
//             toast.error(error.message);
//         },
//     });

//     const { mutate: deletePost, isPending: isDeleting } = useMutation({
// 		mutationFn: async () => {
// 			try {
// 				const res = await fetch(`/api/posts/${post._id}`, {
// 					method: "DELETE",
// 				});
// 				const data = await res.json();

// 				if (!res.ok) {
// 					throw new Error(data.error || "Something went wrong");
// 				}
// 				return data;
// 			} catch (error) {
// 				throw new Error(error);
// 			}
// 		},
// 		onSuccess: () => {
//             console.log("Post deleted successfully");
//             queryClient.invalidateQueries("list-posts");
//             queryClient.setQueryData("list-posts", (oldData) => {
//                 if (!Array.isArray(oldData)) {
//                     return oldData;
//                 }
//                 return oldData.filter((p) => p._id !== post._id);
//             });
//         },
//         onError: (error) => {
//             console.error(error.message);
//         },
// 	});

//     const handleLikePost = () => {
//         if (isLiking) return;
//         likePost();
//     };
//     const handleDeletePost = () => {
// 		deletePost();
// 	};

//     return (
//         <div className="w-full p-2 px-3 my-4">
//             {/* <Link to={`/posts/${post._id}`}></Link> */}
//             <div className="relative bg-background-secondary bg-opacity-10 border border-btn-secondary hover:border-primary transition duration-200 rounded-2xl h-full p-3">
//                 <div className={`cursor-pointer mx-4`}>
//                     <div className='relative flex items-center gap-4 max-[280px]:gap-3 py-2 mb-3'>
//                         <div className='avatar z-0'>
//                             <div className='w-10 max-[280px]:w-8 rounded-full ring-2 ring-primary'>
//                                 <img src='https://avatar.iran.liara.run/public'
//                                     alt='user avatar' />
//                             </div>
//                         </div>
//                         <div className='flex-col sm:inline-block'>
//                             <div className='font-bold text-sm text-primary min-[815px]:text-[18px]'>
//                                 {postOwner.fullName}
//                             </div>
//                             <div className='flex pt-1 gap-5 text-btn-secondary'>
//                                 <span className='text-[11px] ellipsis'>
//                                     {new Date(post.createdAt).toDateString() === new Date().toDateString() ?
//                                         `${formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}`
//                                         : `${format(new Date(post.createdAt), 'MMM d, yyyy')}`
//                                     }
//                                 </span>
//                             </div>
//                         </div>
//                         {isMyPost && (
//                             <span className='flex justify-end flex-1 gap-2'>
//                                 <div>
//                                     <RiEditFill className='cursor-pointer pb-1 w-6 h-6 text-primary hover:text-red-500' />
//                                 </div>
//                                 <div>
//                                 {!isDeleting && (
//                                     <FaTrash className='cursor-pointer text-primary hover:text-red-500' onClick={handleDeletePost} />
//                                 )}
//                                 {isDeleting && <LoadingSpinner size='sm' />}
//                                 </div>
//                             </span>
//                         )}
//                     </div>
//                 </div>
//                 <div className="w-full px-4">
//                         <div
//                             className="mb-4 text-primary"
//                             dangerouslySetInnerHTML={{
//                                 __html: post?.description,
//                             }}
//                         />
//                 </div>
//                 {post?.image ?
//                     <div className="relative mb-3" style={{ height: 240 }}>
//                         <div className="absolute top-0 left-0 z-10"></div>
//                         <div className="absolute bottom-0 right-0 z-10"></div>
//                         {/*post image */}
//                         <img
//                             className="absolute inset-0 w-full h-full object-cover rounded-lg"
//                             src={post?.image?.path}
//                             alt={post?.description}
//                         />
//                     </div>
//                     : <></>}
//                 <div className='flex justify-between mt-3 px-2'>
//                     <div className='flex gap-4 items-center w-2/3 justify-between'>
//                         <div
//                             className='flex gap-1 items-center cursor-pointer group'
//                         //onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
//                         >
//                             <FaRegComment className='w-4 h-4  text-primary group-hover:text-primary' />
//                             {post.comments.length > 0 && <span className='text-sm text-primary group-hover:text-primary'>
//                                 {post.comments.length}
//                             </span>}
//                         </div>
//                         <div className='flex gap-1 items-center group cursor-pointer'>
//                             <BiRepost className='w-6 h-6  text-primary group-hover:text-primary' />
//                             <span className='text-sm text-primary group-hover:text-primary'> </span>
//                         </div>
//                         <div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
//                             {isLiking && <LoadingSpinner size='xs' />}
//                             {!isLiked && !isLiking && (
//                                 <FaRegHeart className='w-4 h-4 cursor-pointer text-primary group-hover:text-pink-500' />
//                             )}
//                             {isLiked && !isLiking && (
//                                 <FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500' />
//                             )}
//                             {post.likes.length > 0 && <span
//                                 className={`text-sm group-hover:text-pink-500 ${isLiked ? "text-pink-500" : "text-primary"}`}
//                             >
//                                 {post.likes.length}
//                             </span>}
//                         </div>
//                     </div>
//                     <div className='flex w-1/3 justify-end gap-2 items-center'>
//                         <FaRegBookmark className='w-4 h-4 text-primary cursor-pointer' />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LikedPost;
