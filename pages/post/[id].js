import {useRouter} from "next/router";
import {getPost} from '../../api/posts';
import {withAuth} from "../../hof/withAuth";
import {changePostThunkCreator,deletePostThunkCreator} from "../../store/posts/asyncAtions/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {postsActions} from "../../store/posts";

import Link from "next/link";
import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import {useEffect} from "react";

export default function Post({userPost, auth}) {
    const {post} = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        dispatch(postsActions.addPost(userPost));

        return () => dispatch(postsActions.clearPost())
    }, [userPost])

    const handleDeleteClick = (deletedPost) => {
        dispatch(deletePostThunkCreator(deletedPost.id));
        router.push('/');
    }

    const handleEditSubmit = (newPost) => dispatch(changePostThunkCreator(post.id, newPost));

    return post ? (
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
        </MainLayout>) : <div>Loading...</div>
}


export const getServerSideProps = withAuth(async (ctx) => {
        try {
            const userPost = await getPost(ctx.query.id);

            return {props: {userPost}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)
