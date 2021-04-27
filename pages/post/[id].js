import cookies from "next-cookies";

import {useRouter} from "next/router";
import {changePost, deletePost} from '../../gateway/postsGateway';

import Link from "next/link";
import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';

import serverApi from "../../utils/serverApi";

export default function Post({post, user}) {
    const router = useRouter();

    const handleDeleteClick = async (deletedPost) => {
        await deletePost(deletedPost.id);
        router.push('/');
    }

    const handleEditSubmit = async (newPost) => {
        await changePost(post.id, newPost);
        router.push('/');
    }

    return (
        <MainLayout user={user}>
            <FormPosts postData={post} onSubmit={handleEditSubmit}/>
            <Link href="/"><span className='btn btn-outline-success mt-2'>Home</span></Link>
            <Posts user={user} post={post} onDelete={handleDeleteClick}/>
        </MainLayout>)
}

export async function getServerSideProps(context) {
    try {
        serverApi.defaults.headers.common['Authorization'] = `Bearer ${cookies(context).jwt}`;

        const user = await serverApi.get('/profile');
        const post = await serverApi.get(`posts/${context.query.id}`);

        return {props: {user: user.data, post: post.data}};
    } catch (error) {
        return {notFound: true}
    }
}
