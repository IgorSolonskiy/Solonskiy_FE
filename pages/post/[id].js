import {useRouter} from "next/router";
import {withAuth} from "../../hof/withAuth";
import {addUserAsync} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import {
    addCommentAsync,
    changeCommentAsync,
    deleteCommentAsync,
    setCommentsListAsync,
    setIdComment
} from "../../store/comments";
import {changePostAsync, deletePostAsync, setPostAsync, setPostId,} from "../../store/posts";

import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import UserProfile from "../../components/user/UserProfile";
import CommentsList from "../../components/list/CommentsList";

export default function Post() {
    const {profile} = useSelector(state => state.profile);
    const {idComment} = useSelector(state => state.comments);
    const {post} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDeletePost = (deletedPost) => {
        dispatch(deletePostAsync(deletedPost.id));
        router.push(`/users/${profile.username}`);
    }

    const handleDeleteComment = (deletedComment) => dispatch(deleteCommentAsync(deletedComment.id));

    const handleSetCommentID = (comment) => {
        if (idComment === comment.id) {
            return dispatch(setIdComment(null))
        }

        return dispatch(setIdComment(comment.id))
    };

    const handleChangeComment = (changeComment) => {
        dispatch(changeCommentAsync(idComment, changeComment))

        return dispatch(setIdComment(null))
    };

    const handleEditPost = (newPost) => dispatch(changePostAsync(post.id, newPost));

    const handleCreateComment = (newComment, formikHelpers) => {
        dispatch(addCommentAsync(post.id, newComment))
        formikHelpers.resetForm(true);
    };

    return (
        <MainLayout>
            {
                post.author.id === profile.id ?
                    <FormPosts postData={post} onSubmit={handleEditPost}/>
                    :
                    <UserProfile/>
            }
            <Posts post={post} onSubmit={handleCreateComment} onDelete={handleDeletePost}/>
            <CommentsList onSubmit={handleChangeComment} onChange={handleSetCommentID} onDelete={handleDeleteComment}/>
        </MainLayout>
    )
}


export const getServerSideProps = withAuth(async (ctx, {user}, {dispatch, getState}) => {
        try {
            await Promise.all([
                dispatch(setPostAsync(ctx.query.id)),
                dispatch(setCommentsListAsync(ctx.query.id)),
                dispatch(setPostId(ctx.query.id)),
            ])

            const {posts: {post: {author}}} = getState();

            if (author.id !== user.id) {
                await dispatch(addUserAsync(author.username))
            }

            return {props: {}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)
