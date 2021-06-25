import {useRouter} from "next/router";
import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";

import MainLayout from "../../components/layout/MainLayout";
import Posts from "../../components/post/Post";
import UserProfile from "../../components/user/UserProfile";
import CommentsList from "../../components/list/CommentsList";
import CreateCommentForm from "../../components/forms/CreateCommentForm";
import {useEffect, useState} from "react";
import {getUser, getUserAsync} from "../../store/user/actions";
import {
    getPost,
    deletePostAsync,
    getPostAsync,
    likePostAsync,
    unlikePostAsync,
    updatePostAsync,
} from "../../store/posts/actions";
import {
    getComments,
    createCommentAsync,
    deleteCommentAsync,
    getCommentsAsync,
    likeCommentAsync,
    unlikeCommentAsync,
    updateCommentAsync,
} from "../../store/comments/actions";
import {useQuery} from "@redux-requests/react";
import {Toaster} from "react-hot-toast";

export default function Post() {
    const dispatch = useDispatch();
    const router = useRouter();
    const {query: {cursor}} = useRouter();
    const {data: {post}} = useQuery(getPost());
    const {data: {user}} = useQuery(getUser());
    const {data: {nextCursor}} = useQuery(getComments(post.id, cursor));
    const [toasterShow, setToasterShow] = useState(false)

    useEffect(() => setToasterShow(true))

    useEffect(() => {
        document.addEventListener("scroll", handleInfiniteScroll);

        return () => document.removeEventListener("scroll", handleInfiniteScroll);
    });

    const handleInfiniteScroll = (e) => {
        const {scrollHeight, scrollTop} = e.target.documentElement;

        if (scrollHeight <= (scrollTop + window.innerHeight) && nextCursor) {
            router.push(`/post/${post.id}${nextCursor ? `?cursor=${nextCursor}` : ''}`, undefined, {shallow: true})
        }
    };

    const handleDeletePost = (deletedPost) => {
        dispatch(deletePostAsync(deletedPost.id));
        router.push(`/users/${user.username}`);
    };

    const handleUnlikePost = (unlikedPost) => dispatch(unlikePostAsync(unlikedPost.id));

    const handleLikePost = (likedPost) => dispatch(likePostAsync(likedPost.id));

    const handleUnlikeComment = (unlikedComment) => dispatch(unlikeCommentAsync(unlikedComment.id));

    const handleLikeComment = (likedComment) => dispatch(likeCommentAsync(likedComment.id));

    const handleDeleteComment = (deletedComment) => dispatch(deleteCommentAsync(deletedComment));

    const handleEditComment = (comment, changeComment) => dispatch(updateCommentAsync(comment.id, changeComment));

    const handleEditPost = (editPost, newPost) => dispatch(updatePostAsync(editPost.id, newPost));

    const handleCreateComment = (newComment) => dispatch(createCommentAsync(post.id, newComment));

    return (
        <MainLayout>
            <UserProfile/>
            {toasterShow && <Toaster/>}
            <Posts onChange={handleEditPost}
                   post={post}
                   onLike={handleLikePost}
                   onUnlike={handleUnlikePost}
                   onDelete={handleDeletePost}/>
            <div className="w-100 d-flex mt-3 justify-content-center">
                <CreateCommentForm onSubmit={handleCreateComment}/>
            </div>
            <CommentsList
                          onLike={handleLikeComment}
                          onUnlike={handleUnlikeComment}
                          onSubmit={handleEditComment}
                          onDelete={handleDeleteComment}/>
        </MainLayout>
    );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, {user}, {dispatch, getState}) => {
            try {
                await Promise.all([
                    dispatch(getPostAsync(ctx.query.id)),
                    dispatch(getCommentsAsync(ctx.query.id)),
                ]);

                const data = getState();
                const author = data.requests.queries["GET_POST"].data.post.author;

                await dispatch(getUserAsync(author.username));

                return {props: {}};
            } catch (e) {
                return {
                    notFound: true,
                };
            }
        },
    ));