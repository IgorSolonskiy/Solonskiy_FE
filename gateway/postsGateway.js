import Api from '../utils/Api';

export const getPosts = async url => {
    try {

        const response = await Api.get(url);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const createPost = async (url, post )=> {
    try {

        const response = await Api.post(url, post);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const changePost = async (url,post) => {
    try {

        const response = await Api.put(url,post);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const deletePost = async url => {
    try {

        const response = await Api.delete(url);
        return response.data;

    } catch (error) {

        throw new Error('Internal Server Error');

    }
}
