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
import {addUserAsync, setUser} from "../../store/user/actions";
import {
  changePostAsync, deletePostAsync,
  setPost,
  setPostAsync,
} from "../../store/posts/actions";
import {
  addCommentAsync,
  changeCommentAsync,
  deleteCommentAsync, setCommentsList,
  setCommentsListAsync,
} from "../../store/comments/actions";

export default function Post() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {data: {post}} = useSelector(getQuerySelector(setPost()));
  const {data: {user}} = useSelector(getQuerySelector(setUser()));
  const {data: {cursor, comments}} = useSelector(
      getQuerySelector(setCommentsList()));

  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handleInfiniteScroll = (e) => {
    const {scrollHeight, scrollTop} = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && cursor) {
      dispatch(setCommentsListAsync(post.id, cursor));
    }
  };

  const handleDeletePost = (deletedPost) => {
    dispatch(deletePostAsync(deletedPost.id));
    router.push(`/users/${user.username}`);
  };

  const handleDeleteComment = (deletedComment) => dispatch(
      deleteCommentAsync(deletedComment.id));
  const handleEditComment = async (comment, changeComment) => await dispatch(
      changeCommentAsync(comment.id, changeComment));
  const handleEditPost = async (editPost, newPost) => await dispatch(
      changePostAsync(editPost.id, newPost));
  const handleCreateComment = (newComment) => dispatch(
      addCommentAsync(post.id, newComment));

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
              dispatch(setPostAsync(ctx.query.id)),
              dispatch(setCommentsListAsync(ctx.query.id)),
            ]);

            const data = getState();
            const author = data.requests.queries["POSTS.SET_POST"].data.post.author;

            await dispatch(addUserAsync(author.username));

            return {props: {}};
          } catch (e) {
            console.log(e);
            return {
              notFound: true,
            };
          }
        },
    ));