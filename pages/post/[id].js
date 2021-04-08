import MainLayout from "../../components/layout/MainLayout";

import {useRouter} from "next/router";
import {confirmUser} from "../../gateway/userGateway";
import {changePost, deletePost, getPosts} from '../../gateway/postsGateway';

import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import Link from "next/link";

export default function Post({post, user}) {
    const router = useRouter();

    const handleDeleteClick = async (deletedPost) => {
        await deletePost(deletedPost.id);
        router.push('/home');
    }

    const handleEditSubmit = async (newPost) => {
        await changePost(post.id, newPost);
        router.push('/home');
    }

    return (
        <MainLayout user={user}>
            {user.email === post.user_email ? <FormPosts postData={post} onSubmit={handleEditSubmit}/> : ''}
            <div className="mb-3"><Link href='/home'>Home</Link></div>
            <Posts user={user} post={post} onDelete={handleDeleteClick}/>
        </MainLayout>)
}

export async function getServerSideProps(context) {
    try {
        const user = await confirmUser(context);
        const post = await getPosts(context.query.id, context);

        return {props: {post, user}};
    } catch (error) {
        return {notFound: true}
    }
}
