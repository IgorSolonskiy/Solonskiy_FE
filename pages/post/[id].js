import {useRouter} from "next/router";
import {withAuth} from "../../hof/withAuth";
import {addUserAsync} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import {
    addCommentAsync,
    changeCommentAsync,
    commentsActions,
    deleteCommentAsync,
    setCommentsListAsync
} from "../../store/comments";
import {changePostAsync, deletePostAsync, setPostAsync,} from "../../store/posts";

import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import UserProfile from "../../components/user/UserProfile";
import CommentsList from "../../components/list/CommentsList";

export default function Post() {
    const {posts: {post}, comments: {idComment}, profile: {profile}} = useSelector(state => state);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDeletePost = (deletedPost) => {
        dispatch(deletePostAsync(deletedPost.id));
        router.push('/');
    }

    const handleDeleteComment = (deletedComment) => dispatch(deleteCommentAsync(deletedComment.id));

    const handleSetCommentID = (comment) => {
        if (idComment === comment.id) {
            return dispatch(commentsActions.setIdComment(null))
        }

        return dispatch(commentsActions.setIdComment(comment.id))
    };

    const handleChangeComment = (changeComment) => {
        dispatch(changeCommentAsync(idComment, changeComment))

        return dispatch(commentsActions.setIdComment(null))
    };

    const handleEditSubmit = (newPost) => dispatch(changePostAsync(post.id, newPost));

    const handleCreateComment = (newComment, formikHelpers) => {
        dispatch(addCommentAsync(post.id, newComment))
        formikHelpers.resetForm(true);
    };

    return (
        <MainLayout>
            {
                post.author.id === profile.id ?
                    <FormPosts postData={post} onSubmit={handleEditSubmit}/>
                    :
                    <UserProfile/>
            }
            <Posts post={post} onSubmit={handleCreateComment} onDelete={handleDeletePost} createComment={true}/>
            <CommentsList onSubmit={handleChangeComment} onChange={handleSetCommentID} onDelete={handleDeleteComment}/>
        </MainLayout>
    )
}


export const getServerSideProps = withAuth(async (ctx, auth, dispatch, reduxStore) => {
        try {
            await Promise.all([
                dispatch(setPostAsync(ctx.query.id)),
                dispatch(setCommentsListAsync(ctx.query.id))
            ])

            const {posts: {post}} = reduxStore.getState();

            if (post.author.id !== auth.user.id) {
                await dispatch(addUserAsync(post.author.username))
            }

            return {props: {}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)
