import {useRouter} from "next/router";
import Link from "next/link";

import {changePost, deletePost, getPost} from '../../gateway/postsGateway';

import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import {confirmUser} from "../../gateway/usersGateway";

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
        <MainLayout>
            {post.author.id === user.id ? <FormPosts postData={post} onSubmit={handleEditSubmit}/> :
                <Link href={`/user/${post.author.username}`}><span
                    className='btn btn-outline-success mt-2'>{post.author.username}</span></Link>}
            <Link href="/"><span className='btn btn-outline-success mt-2'>Home</span></Link>
            <Posts user={user} post={post} onDelete={handleDeleteClick}/>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        const post = await getPost(context.query.id, context);
        const user = await confirmUser(context);

        return {props: {post, user}};
    } catch (error) {
        return {notFound: true}
    }
}
