import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/posts';

export const getPostsList = async () => {
    const res = await axios.get(baseUrl);

    return res.data;
}

export const getPost = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`);

    return [res.data];
}

export const createPost = async (post) => {
    await axios.post(baseUrl, {text: post});

    return await getPostsList();
}

export const deletePost = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);

    return await getPostsList();
}

export const changePost = async (id, textPosts) => {
    await axios.put(`${baseUrl}/${id}`, {text: textPosts});

    return await getPostsList();
}