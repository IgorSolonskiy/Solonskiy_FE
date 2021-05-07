import {useRouter} from "next/router";
import {getPost} from '../../api/posts';
import {withAuth} from "../../hof/withAuth";
import {changePostThunkCreator, deletePostThunkCreator} from "../../store/posts/asyncAtions/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {profileActions} from "../../store/profile";
import {postsActions} from "../../store/posts";
import {userActions} from "../../store/user";

import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import UserProfile from "../../components/user/UserProfile";

export default function Post({userPost, auth}) {
    const {post} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        dispatch(postsActions.addPost(userPost));
        dispatch(userActions.addUser(userPost.author));
        dispatch(profileActions.addProfile(auth.user));
    }, [userPost])

    const handleDeleteClick = (deletedPost) => {
        dispatch(deletePostThunkCreator(deletedPost.id));
        router.push('/');
    }

    const handleEditSubmit = (newPost) => dispatch(changePostThunkCreator(post.id, newPost));

    return (post &&
        <MainLayout>
            {
                userPost.author.id === auth.user.id ?
                    <FormPosts postData={userPost} onSubmit={handleEditSubmit}/>
                    :
                    <UserProfile/>
            }
            <Posts post={post} onDelete={handleDeleteClick}/>
        </MainLayout>
    )
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
