import apiClient from '../libs/apiClient';
import apiServer from "../libs/apiServer";

export const getPost = async (id = '') => {
    const {data: response} = await apiServer.get(`posts/${id}`);

    return response;
}

export const getUserPosts = async (email = '') => {
    const {data: response} = await apiServer.get(`users/${email}/posts`);

    return response;
}

export const createPost = async (post) => {
    const {data: response} = await apiClient.post('posts', post);

    return response;
}

export const changePost = async (id, post) => {
    const {data: response} = await apiClient.put(`posts/${id}`, post);

    return response;
}

export const deletePost = async (id) => {
    const {data: response} = await apiClient.delete(`posts/${id}`);

    return response;
}
