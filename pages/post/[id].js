import {useRouter} from "next/router";

import {changePost, deletePost, getPosts} from '../../gateway/postsGateway';

import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';

export default function Post({post}) {
    const router = useRouter();

    const handleDeleteClick =async (deletedPost) => {
        await  deletePost(deletedPost.id);
        router.push('/');
    }

    const handleEditSubmit = async (newPost) => {
        await  changePost(post.id,newPost);
        router.push('/');
    }

    return (
        <MainLayout>
            <FormPosts postData={post} onSubmit={handleEditSubmit}/>
            <Posts key={post.id} post={post} onDelete={handleDeleteClick} />
        </MainLayout>)
}

Post.getInitialProps = async (ctx) => {
    const post = await getPosts(ctx.query.id);

    return {post};
};
