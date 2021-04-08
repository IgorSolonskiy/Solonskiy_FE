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
            <div className='w-100 h-100 d-flex flex-column align-items-center'>
                {user.email === post.user_email ? <FormPosts postData={post} onSubmit={handleEditSubmit}/> : ''}
                <Link href="/home"><span className='btn btn-outline-success w-25 mt-5'>Home</span></Link>
                <div className='mt-5 w-100'>
                    <Posts user={user} post={post} onDelete={handleDeleteClick}/>
                </div>
            </div>
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
