import apiServer from "../libs/apiServer";

export const getPost = async (id = '') => {
    const {data: response} = await apiServer.get(`posts/${id}`);

    return response;
}

export const getUserPosts = async (email = '') => {
    const {data: response} = await apiServer.get(`users/${email}/posts`);

    return response;
}