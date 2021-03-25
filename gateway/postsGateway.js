import axios from 'axios';

export const getPostsList = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/posts');

    return res.data;
}

export const createPost = async (post) => {
    await axios.post('http://127.0.0.1:8000/api/posts', {text: post});

    return await getPostsList();
}

export const deletePost = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);

    return await getPostsList();
}

export const changePost = async (id, textPosts) => {
    await axios.put(`http://127.0.0.1:8000/api/posts/${id}`, {text: textPosts});

    return await getPostsList();
}