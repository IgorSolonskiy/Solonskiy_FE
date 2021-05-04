import {useState} from "react";
import {useRouter} from "next/router";
import {changePost, deletePost, getPost} from '../../gateway/postsGateway';
import {withAuth} from "../../hof/withAuth";

import Link from "next/link";
import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';

export default function Post({userPost, auth}) {
    const [post, setPost] = useState(userPost);
    const router = useRouter();

    const handleDeleteClick = async (deletedPost) => {
        await deletePost(deletedPost.id);
        router.push('/');
    }

    const handleEditSubmit = async (newPost) => {
        const changedPost = await changePost(post.id, newPost);

        setPost(changedPost);
    }

    return (
        <MainLayout user={auth.user}>
            {
                post.author.id === auth.user.id ?
                    <FormPosts postData={post} onSubmit={handleEditSubmit}/>
                    :
                    <Link href={`/users/${post.author.username}`}>
                        <span className='btn btn-outline-success mt-2'>{post.author.username}</span>
                    </Link>
            }
            <Link href="/"><span className='btn btn-outline-success mt-2'>Home</span></Link>
            <Posts user={auth.user} post={post} onDelete={handleDeleteClick}/>
        </MainLayout>)
}


export const getServerSideProps = withAuth(async (ctx) => {
        const userPost = await getPost(ctx.query.id);

        return {props: {userPost}};
    }
)
