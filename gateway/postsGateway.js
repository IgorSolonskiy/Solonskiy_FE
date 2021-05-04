import apiClient from '../utils/apiClient';
import apiServer from "../utils/apiServer";

export const getPost = async (id = '') => {
    try {

        const response = await apiServer.get(`posts/${id}`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const userPosts = async (email = '') => {
    try {
        const response = await apiServer.get(`users/${email}/posts`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const createPost = async (post) => {
    try {

        const response = await apiClient.post('posts', post);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const changePost = async (id, post) => {
    try {

        const response = await apiClient.put(`posts/${id}`, post);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const deletePost = async (id) => {
    try {

        const response = await apiClient.delete(`posts/${id}`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}
