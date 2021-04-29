import {useState} from 'react';
import {useRouter} from "next/router";
import {createPost, deletePost, userPosts} from '../gateway/postsGateway';
import {confirmUser} from "../gateway/usersGateway";

import FormPosts from "../components/forms/FormPosts";
import List from "../components/list/List";
import Post from "../components/post/Post";
import MainLayout from "../components/layout/MainLayout";
import FormFilters from "../components/forms/FormFilters";

export default function Home({postsList, user}) {
    const [posts, setPosts] = useState(postsList);
    const router = useRouter();

    const handleDeleteClick = async (deletedPost) => {
        await deletePost(deletedPost.id);
        setPosts(prevPosts => prevPosts.filter((post) => post.id !== deletedPost.id));
    }

    const handleCreateSumbit = async (newPost, formikHelpers) => {
        const post = await createPost(newPost);

        setPosts(prevPosts => [...prevPosts, post]);
        formikHelpers.resetForm(true);
    }

    const handleFilterSubmit = async (username) => {
        router.push(`/users/${username}`);
    }

    return (
        <MainLayout user={user}>
            <div className="d-flex">
                <h1>Hello, {user.name}</h1>
            </div>
            <FormPosts onSubmit={handleCreateSumbit}/>
            <FormFilters onSubmit={handleFilterSubmit}/>
            <List>
                {posts.map(post => <Post user={user} key={post.id} post={post} onDelete={handleDeleteClick}/>)}
            </List>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        const user = await confirmUser();
        const postsList = await userPosts(user.username);

        return {props: {postsList, user}};
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
}