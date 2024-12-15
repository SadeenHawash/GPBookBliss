import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
    FaThumbsUp,
    FaThumbsDown,
    FaEye,
    FaEdit,
    FaTrashAlt,
    FaComment,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { fetchPost } from "../../../../../APIServices/posts/postsAPI";

const PostDetailsForm = () => {
    const [comment, setComment] = useState("");
    // !Get the post id
    const { postId } = useParams();
    // ! use query
    const { isError, isLoading, data, error, isSuccess } = useQuery({
        queryKey: ["post-details"],
        queryFn: () => fetchPost(postId),
    });
    console.log(data);
    return (
        <div className="mx-4 mt-16 my-6 justify-center h-full text-primary">
            <div className="max-w-[800px] bg-background rounded-lg box p-4">
            <div className={`cursor-pointer mx-4`}>
                    <div className='relative flex items-center gap-4 max-[280px]:gap-3 py-2 mb-2'>
                        <div className='avatar z-0'>
                            <div className='w-10 max-[280px]:w-8 rounded-full ring-2 ring-primary'>
                                <img src='https://avatar.iran.liara.run/public'
                                    alt='user avatar' />
                            </div>
                        </div>
                        <div className='flex-col sm:inline-block'>
                            <div className='font-bold text-sm text-primary min-[815px]:text-[18px]'>
                                User Name
                            </div>
                                                {/* {chat.latestMessage && (
                                                    <div className='flex pt-1 gap-5 text-btn-secondary'>
                                                        <span className='text-[11px] ellipsis'>
                                                        {chat.isChatGroup ? `${chat.latestMessage.sender.username}: ${chat.latestMessage.content}` :
                                                            chat.latestMessage.content
                                                        }
                                                        </span>
                                                        <span className='absolute right-2 text-[11px]'> {extractTime(chat.latestMessage.createdAt)}</span> 
                                                    </div>
                                                )} */}
                        </div>
                    </div>
                </div>
                {data?.postFounded?.image ? 
                    <img
                    className="w-full h-full object-cover rounded-lg mb-4"
                    src={data?.postFounded?.image?.path}
                    alt={data?.postFounded?.description}
                    /> 
                : <></> 
                }
                {/* <img
                className="w-full h-full object-cover rounded-lg mb-4"
                src={data?.postFounded?.image?.path}
                alt={data?.postFounded?.description}
                /> */}
                {/* Show messages */}
                {/* follow icon */}
                {/* {isFollowing ? (
                <button
                    onClick={handleFollow}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    <RiUserUnfollowFill className="mr-2" />
                    Unfollow
                </button>
                ) : (
                <button
                    onClick={handleFollow}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Follow
                    <RiUserFollowLine className="ml-2" />
                </button>
                )} */}

                {/* author */}
                <span className="ml-2">{/* {postData?.author?.username} */}</span>

                {/* post details */}
                <div className="flex justify-between items-center mb-3">
                <div
                    className="rendered-html-content mb-2"
                    dangerouslySetInnerHTML={{ __html: data?.postFounded?.description }}
                />

                {/* Edit delete icon */}
                <div className="flex gap-2">
                    <FaEdit className="text-primary cursor-pointer" />
                    <FaTrashAlt className="text-primary cursor-pointer" />
                </div>
                </div>
                <div className="flex gap-4 items-center mb-4">
                    icons
                </div>

                {/* Comment Form */}
                <form>
                <textarea
                    className="w-full border border-primary bg-btn-primary bg-opacity-10 p-2 rounded-xl mb-2
                    text-primary placeholder:text-btn-secondary placeholder:text-sm"
                    rows="3"
                    placeholder="Add a comment..."
                    value={comment}
                    // onChange={(e) => setComment(e.target.value)}
                    // {...formik.getFieldProps("content")}
                ></textarea>
                {/* comment error */}
                {/* {formik.touched.content && formik.errors.content && (
                    <div className="text-red-500 mb-4 mt-1">
                    {formik.errors.content}
                    </div>
                )} */}
                <button
                    type="submit"
                    className="bg-primary text-white text-sm rounded-3xl px-3 py-2"
                >
                    <FaComment className="inline mr-2" />
                    Comment
                </button>
                </form>
                {/* Comments List */}
                <div>
                <h2 className="text-xl font-bold my-2 text-primary">Comments:</h2>
                {/* {postData?.comments?.map((comment, index) => (
                    <div key={index} className="border-b border-gray-300 mb-2 pb-2">
                    <p className="text-gray-800">{comment.content}</p>
                    <span className="text-gray-600 text-sm">
                        - {comment.author?.username}
                    </span>
                    <small className="text-gray-600 text-sm ml-2">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </small>
                    </div>
                ))} */}
                </div>
            </div>
        </div>
    );
};

export default PostDetailsForm;