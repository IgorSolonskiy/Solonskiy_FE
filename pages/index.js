import {useRouter} from "next/router";
import {useState} from 'react';
import {createPost, deletePost, userPosts} from '../gateway/postsGateway';
import {confirmUser} from "../gateway/usersGateway";

import FormPosts from "../components/forms/FormPosts";
import List from "../components/list/List";
import Post from "../components/post/Post";
import MainLayout from "../components/layout/MainLayout";
import FormFilters from "../components/forms/FormFilters";

export default function Home({postsList, user}) {
    const [posts, setPosts] = useState(postsList);
    const [filterUser, setFilterUser] = useState('');
    const router = useRouter();

    const handleDeleteClick = async (deletedPost) => {
        await deletePost(deletedPost.id);
        setPosts(prevPosts => prevPosts.filter((post) => post.id !== deletedPost.id));
    }

    const handleCreateSumbit = async (newPost, postState) => {
        const post = await createPost(newPost);

        postState({content: '', title: ''})
        setPosts(prevPosts => [...prevPosts, post]);
    }

    const handleChangeFilters = (email) => {
        setFilterUser(email);
    }

    const handleFlitersUser = (e) => {
        e.preventDefault();
        setFilterUser('');
        router.push(`/user/${filterUser}`)
    }


    return (
        <MainLayout>
            <div className="d-flex">
                <h1 className=''>Hello, {user.name}</h1>
            </div>
            <FormPosts onSubmit={handleCreateSumbit}/>
            <FormFilters onSubmit={handleFlitersUser} onChange={handleChangeFilters} filtersUser={filterUser}/>
            <List>
                {posts.map(post => <Post key={post.id} post={post} onDelete={handleDeleteClick}/>)}
            </List>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        const user = await confirmUser(context);
        const postsList = await userPosts(user.username, context);

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