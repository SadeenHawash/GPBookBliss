import axios from "axios";
const BASE_URL = "http://localhost:5000/api/posts";

//create post api
export const createPostAPI = async (postData) => {
    console.log(postData);
    const response = await axios.post(`${BASE_URL}/create` , postData, {
        withCredentials: true,
    });
    return response.data;
};

//fetch all posts 
export const fetchAllPosts = async () => {
    const posts = await axios.get(BASE_URL);
    return posts.data;
}

//fetch post by id
export const fetchPost = async (postId) => {
    const post = await axios.get(`${BASE_URL}/${postId}`);
    return post.data;
}

//update post api
export const updatePostAPI = async (postData) => {
    const response = await axios.put(`${BASE_URL}/${postData?.postId}`, {
        title: postData.title,
        description: postData.description,
    });
    return response.data;
}

//delete post api
export const deletePostAPI = async (postId) => {
    const response = await axios.delete(`${BASE_URL}/${postId}`);
    return response.data;
}

export const likePostAPI = async (postId) => {
    const response = await axios.post(`${BASE_URL}/like/${postId}`);
    return response.data;
}

export const fetchUserPosts = async (username) => {
    const userPosts = await axios.get(`${BASE_URL}/user/${username}`);
    return response.data;
}