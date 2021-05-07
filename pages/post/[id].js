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
import {getComments} from "../../api/comments";
import {commentsActions} from "../../store/comments";
import CommentsList from "../../components/list/CommentsList";
import FormComments from "../../components/forms/FormComments";
import {addCommentThunkCreator, deleteCommentThunkCreator} from "../../store/comments/asyncActions/asyncActions";

export default function Post({userPost, postComments, auth}) {
    const {post} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        dispatch(postsActions.addPost(userPost));
        dispatch(profileActions.addProfile(auth.user));
        dispatch(commentsActions.addCommentsList(postComments));
        if(userPost.author.id !== auth.user.id) {
            dispatch(userActions.addUser(userPost.author));
        }
        return ()=>dispatch(userActions.removeUser());
    }, [userPost])

    const handleDeletePost = (deletedPost) => {
        dispatch(deletePostThunkCreator(deletedPost.id));
        router.push('/');
    }

    const handleDeleteComment = (deletedComment) => dispatch(deleteCommentThunkCreator(deletedComment.id));

    const handleEditSubmit = (newPost) => dispatch(changePostThunkCreator(post.id, newPost));

    const handleCreateComment = (newComment, formikHelpers) => {
        dispatch(addCommentThunkCreator(post.id, newComment))
        formikHelpers.resetForm(true);
    };

    return (post &&
        <MainLayout>
            {
                userPost.author.id === auth.user.id ?
                    <FormPosts postData={post} onSubmit={handleEditSubmit}/>
                    :
                    <>
                        <UserProfile/>
                        <FormComments onSubmit={handleCreateComment}/>
                    </>
            }
            <Posts post={post} onDelete={handleDeletePost}/>
            <CommentsList onDelete={handleDeleteComment}/>
        </MainLayout>
    )
}


export const getServerSideProps = withAuth(async (ctx) => {
        try {
            const userPost = await getPost(ctx.query.id);
            const postComments = await getComments(ctx.query.id);

            return {props: {userPost, postComments}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)
