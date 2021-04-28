import cookies from "next-cookies";
import {useState} from 'react';
import {createPost, deletePost} from '../gateway/postsGateway';

import FormPosts from "../components/forms/FormPosts";
import List from "../components/list/List";
import Post from "../components/post/Post";
import MainLayout from "../components/layout/MainLayout";

import serverApi from "../utils/serverApi";

export default function Home({postsList, user}) {

    const [posts, setPosts] = useState(postsList);

    const handleDeleteClick = async (deletedPost) => {
        await deletePost(deletedPost.id);
        setPosts(prevPosts => prevPosts.filter((post) => post.id !== deletedPost.id));
    }

    const handleCreateSumbit = async (newPost, postState) => {
        const post = await createPost(newPost);

        postState({content: '', title: ''})
        setPosts(prevPosts => [...prevPosts, post]);
    }

    return (
        <MainLayout user={user}>
            <div className="d-flex">
                <h1 className=''>Hello, {user.name}</h1>
            </div>
            <FormPosts onSubmit={handleCreateSumbit}/>
            <List>
                {posts.map(post => <Post user={user} key={post.id} post={post} onDelete={handleDeleteClick}/>)}
            </List>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        serverApi.defaults.headers.common['Authorization'] = `Bearer ${cookies(context).jwt}`;

        const user = await serverApi.get('/profile');
        const postsList = await serverApi.get(`users/${user.data.username}/posts`);

        return {props: {postsList: postsList.data, user: user.data}};
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
}