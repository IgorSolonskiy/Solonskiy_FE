import Api from '../utils/Api';
import serverApi from "../utils/serverApi";

export const getPost = async (id = '') => {
    try {

        const response = await serverApi.get(`posts/${id}`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const userPosts = async (email = '') => {
    try {
        const response = await serverApi.get(`users/${email}/posts`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const createPost = async (post) => {
    try {

        const response = await Api.post('posts', post);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const changePost = async (id, post) => {
    try {

        const response = await Api.put(`posts/${id}`, post);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const deletePost = async (id) => {
    try {

        const response = await Api.delete(`posts/${id}`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}
