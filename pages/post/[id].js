import {useRouter} from "next/router";
import {changePost, deletePost, getPost} from '../../gateway/postsGateway';

import Link from "next/link";
import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import {confirmUser} from "../../gateway/usersGateway";
import serverApi from "../../utils/serverApi";
import cookies from "next-cookies";

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
            {post.author.id === user.id ?
                <FormPosts postData={post} onSubmit={handleEditSubmit}/>
                :
                <Link href={`/users/${post.author.username}`}>
                    <span className='btn btn-outline-success mt-2'>{post.author.username}</span>
                </Link>}
            <Link href="/"><span className='btn btn-outline-success mt-2'>Home</span></Link>
            <Posts user={user} post={post} onDelete={handleDeleteClick}/>
        </MainLayout>)
}

export async function getServerSideProps(context) {
    try {
        serverApi.defaults.headers.common['Authorization'] = `Bearer ${cookies(context).jwt}`;

        const user = await confirmUser();
        const post = await getPost(context.query.id);

        return {props: {user, post}};
    } catch (error) {
        return {notFound: true}
    }
}
