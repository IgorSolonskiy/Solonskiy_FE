import {useState} from 'react';
import {useRouter} from "next/router";

import {changePost, getPosts} from '../../gateway/postsGateway';

import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import List from "../../components/list/List";
import Posts from '../../components/post/Post';

export default function Post({posts}) {
    const [postsList, setPostList] = useState(posts);
    const router = useRouter();

    const handleDeleteClick = () => {
        router.push('/');
    }

    const handleEditSubmit = async (newPost) => {
        const post = await  changePost(`posts/${postsList.id}`,newPost );

        setPostList(post);
    }
    return (
        <MainLayout>
            <FormPosts onSubmit={handleEditSubmit}/>
            <List>{[postsList].map(post=><Posts key={post.id} {...post}  onDelete={handleDeleteClick} />) }</List>
        </MainLayout>)
}

Post.getInitialProps = async (ctx) => {
    const posts = await getPosts(`posts/${ctx.query.id}`);
    return {posts};
};