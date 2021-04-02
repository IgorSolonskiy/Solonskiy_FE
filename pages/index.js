import {useState} from 'react';

import {getPosts, createPost, deletePost} from '../gateway/postsGateway';

import MainLayout from "../components/layout/MainLayout";
import FormPosts from "../components/forms/FormPosts";
import List from "../components/list/List";
import Post from "../components/post/Post";

export default function Posts({postsList}) {
    const [posts, setPosts] = useState(postsList);

    const handleDeleteClick = async (deletedPost) => {
        await  deletePost(deletedPost.id);
        setPosts(prevPosts => prevPosts.filter((post) => post.id !== deletedPost.id));
    }

    const handleCreateSumbit = async (newPost,postState) => {
            const post = await createPost(newPost);

            postState({content: '', title: ''})
            setPosts([...posts, post]);
    }

    return (
        <MainLayout>
            <FormPosts onSubmit={handleCreateSumbit}/>
            <List>
                {posts.map(post => <Post key={post.id} post={post} onDelete={handleDeleteClick}/>)}
            </List>
        </MainLayout>
    )
}

export async function getServerSideProps(context){
    try{
        const postsList = await getPosts();

        return {props: {postsList}};
    } catch (error) {
        return {notFound: true}
    }
};
