import {useRouter} from "next/router";
import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch, useSelector} from "react-redux";

import MainLayout from "../../components/layout/MainLayout";
import Posts from "../../components/post/Post";
import UserProfile from "../../components/user/UserProfile";
import CommentsList from "../../components/list/CommentsList";
import CreateCommentForm from "../../components/forms/CreateCommentForm";
import {useEffect} from "react";
import {getQuerySelector} from "@redux-requests/core";
import {getUser, getUserAsync} from "../../store/user/actions";
import {
  deletePostAsync, getPost, getPostAsync,
  updatePostAsync,
} from "../../store/posts/actions";
import {
  createCommentAsync,
  deleteCommentAsync, getComments, getCommentsAsync, updateCommentAsync,
} from "../../store/comments/actions";

export default function Post() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {data: {post}} = useSelector(getQuerySelector(getPost()));
  const {data: {user}} = useSelector(getQuerySelector(getUser()));
  const {data: {cursor}} = useSelector(
      getQuerySelector(getComments()));

  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handleInfiniteScroll = (e) => {
    const {scrollHeight, scrollTop} = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && cursor) {
      dispatch(getComments(post.id, cursor));
    }
  };

  const handleDeletePost = (deletedPost) => {
    dispatch(deletePostAsync(deletedPost.id));
    router.push(`/users/${user.username}`);
  };

  const handleDeleteComment = (deletedComment) => dispatch(
      deleteCommentAsync(deletedComment.id));
  const handleEditComment = async (comment, changeComment) => await dispatch(
      updateCommentAsync(comment.id, changeComment));
  const handleEditPost = async (editPost, newPost) => await dispatch(
      updatePostAsync(editPost.id, newPost));
  const handleCreateComment = (newComment) => dispatch(
      createCommentAsync(post.id, newComment));

  return (
      <MainLayout>
        <UserProfile/>
        <Posts onChange={handleEditPost}
               post={post}
               onDelete={handleDeletePost}/>
        <div className="w-100 d-flex mt-3 justify-content-center">
          <CreateCommentForm onSubmit={handleCreateComment}/>
        </div>
        <CommentsList onSubmit={handleEditComment}
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
            const author = data.requests.queries["POSTS.GET_POST"].data.post.author;

            await dispatch(getUserAsync(author.username));

            return {props: {}};
          } catch (e) {
            return {
              notFound: true,
            };
          }
        },
    ));