import Api from '../utils/Api';
import configApi from '../common/configApi';

export const getPosts = async (id = '', token = '') => {
    try {

        const response = await Api.get(`posts/${id}`, configApi(token));
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const createPost = async (post) => {
    try {

        const response = await Api.post('posts', post, configApi());
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const changePost = async (id, post) => {
    try {

        const response = await Api.put(`posts/${id}`, post, configApi());
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const deletePost = async (id) => {
    try {

        const response = await Api.delete(`posts/${id}`, configApi());
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const allPostsByUser = async ( email,token = '' )=> {
    try {

        const response = await Api.get(`posts/users/${email}`,configApi(token));
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}