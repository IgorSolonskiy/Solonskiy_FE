import {useState} from 'react';

import {getPosts, createPost, deletePost} from '../gateway/postsGateway';

import MainLayout from "../components/layout/MainLayout";
import FormPosts from "../components/forms/FormPosts";
import List from "../components/list/List";
import Post from "../components/post/Post";

export default function Posts({posts}) {
    const [postsList, setPostsList] = useState(posts);

    const handleDeleteClick = async (id) => {
        await  deletePost(`posts/${id}`);

        const newPostList = postsList.filter((post) => post.id !== id);

        setPostsList(newPostList);
    }

    const handleCreateSumbit = async (newPost) => {
        const post = await createPost('posts', newPost);

        setPostsList([...postsList, post]);
    }

    const [...newPostList] = postsList;

    return (
        <MainLayout>
            <FormPosts onSubmit={handleCreateSumbit}/>
            <List>
                {newPostList.reverse().map(post => <Post key={post.id} {...post} onDelete={handleDeleteClick}/>)}
            </List>
        </MainLayout>
    )
}

Posts.getInitialProps = async () => {
    const posts = await getPosts('posts');
    return {posts};
};
