import {useRouter} from "next/router";
import {getPost} from '../../api/posts';
import {withAuth} from "../../hof/withAuth";
import {changePostThunkCreator, deletePostThunkCreator} from "../../store/posts/asyncAtions/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {postsActions} from "../../store/posts";
import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import LinkSuccess from "../../components/link/LinkSuccess";
import {useEffect} from "react";
import {profileActions} from "../../store/profile";

export default function Post({userPost, auth}) {
    const {post} = useSelector((state) => state.posts)
    const {profile} = useSelector((state) => state.profile)

    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        dispatch(postsActions.addPost(userPost));
        dispatch(profileActions.addProfile(auth.user));
    }, [userPost])

    const handleDeleteClick = (deletedPost) => {
        dispatch(deletePostThunkCreator(deletedPost.id));
        router.push('/');
    }

    const handleEditSubmit = (newPost) => dispatch(changePostThunkCreator(post.id, newPost));

    return post ? (
        <MainLayout>
            {
                post.author.id === profile.id ?
                    <FormPosts postData={userPost} onSubmit={handleEditSubmit}/>
                    :
                    <LinkSuccess src={`/users/${post.author.username}`} name={post.author.username}/>
            }
            <LinkSuccess src='/' name='HOME'/>
            <Posts post={post} onDelete={handleDeleteClick}/>
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
