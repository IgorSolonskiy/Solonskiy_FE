import {Api} from "../utils/Api";

export const getPost = async (id = '') => {
    try {

        const response = await Api.instance.get(`posts/${id}`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const userPosts = async (email = '') => {
    try {
        const response = await Api.instance.get(`users/${email}/posts`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const createPost = async (post) => {
    try {

        const response = await Api.instance.post('posts', post);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const changePost = async (id, post) => {
    try {

        const response = await Api.instance.put(`posts/${id}`, post);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const deletePost = async (id) => {
    try {

        const response = await Api.instance.delete(`posts/${id}`);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}
