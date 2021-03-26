import {useState} from 'react';

import {getPosts, createPost} from '../gateway/postsGateway';

import MainLayout from "../components/layout/MainLayout";
import Form from "../components/forms/Form";
import List from "../components/list/List";
import Post from "../components/post/Post";

export default function Posts({posts}) {
    const [postsList, setPostsList] = useState(posts);

    const handleDeleteClick = (id) => {
        const newPostList = postsList.filter((post) => post.id !== id);

        setPostsList(newPostList);
    }

    const handleCreateSumbit = async (postDescription) => {
        const newPost = {
            content: postDescription,
            name: 'User-Login'
        }

        const post = await createPost('posts', newPost);
        setPostsList([...postsList, post]);
    }

    const [...newPostList] = postsList;

    return (
        <MainLayout>
            <Form onSubmit={handleCreateSumbit}/>
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

