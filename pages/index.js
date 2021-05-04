import {useState} from 'react';
import {useRouter} from "next/router";
import {createPost, deletePost, userPosts} from '../gateway/postsGateway';
import {withAuth} from "../hof/withAuth";

import FormPosts from "../components/forms/FormPosts";
import List from "../components/list/List";
import Post from "../components/post/Post";
import MainLayout from "../components/layout/MainLayout";
import FormFilters from "../components/forms/FormFilters";

export default function Home({postsList, auth}) {
    const [posts, setPosts] = useState(postsList);
    const router = useRouter();

    const handleDeleteClick = async (deletedPost) => {
        await deletePost(deletedPost.id);
        setPosts(prevPosts => prevPosts.filter((post) => post.id !== deletedPost.id));
    }

    const handleCreateSumbit = async (newPost,formikHelpers) => {
        const post = await createPost(newPost);

        setPosts(prevPosts => [...prevPosts, post]);
        formikHelpers.resetForm(true);
    }

    const handleFilterSubmit = async (username) => {
        router.push(`/users/${username}`);
    }

    return (
        <MainLayout user={auth.user}>
            <div className="d-flex">
                <h1>Hello, {auth.user.name}</h1>
            </div>
            <FormPosts onSubmit={handleCreateSumbit}/>
            <FormFilters onSubmit={handleFilterSubmit}/>
            <List>
                {posts.map(post => <Post user={auth.user} key={post.id} post={post} onDelete={handleDeleteClick}/>)}
            </List>
        </MainLayout>
    )
}

export const getServerSideProps = withAuth(async  (ctx,auth) => {
    const postsList = await userPosts(auth.user.username);

    return {props: {postsList}};
    }
)
