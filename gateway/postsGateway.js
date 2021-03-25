import axios from 'axios';

export const getPostsList = async () =>{
    return await axios.get('http://127.0.0.1:8000/api/posts');
}

export const createPost = async (post) =>{
    return await axios.post('http://127.0.0.1:8000/api/posts', {text: post});
}