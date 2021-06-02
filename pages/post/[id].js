import { useRouter } from "next/router";
import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { addUserAsync } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAsync, changeCommentAsync, deleteCommentAsync, setCommentsListAsync, } from "../../store/comments";
import { changePostAsync, deletePostAsync, setPostAsync, setPostId, setPostsListAsync, } from "../../store/posts";

import MainLayout from "../../components/layout/MainLayout";
import Posts from "../../components/post/Post";
import UserProfile from "../../components/user/UserProfile";
import CommentsList from "../../components/list/CommentsList";
import CreateCommentForm from "../../components/forms/CreateCommentForm";
import { useEffect } from "react";

export default function Post () {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.users.user);
  const post = useSelector(state => state.posts.post);
  const fetching = useSelector((state) => state.comments.fetching);
  const nextPage = useSelector((state) => state.comments.pagination.nextPage);

  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handleInfiniteScroll = (e) => {
    const { scrollHeight, scrollTop } = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && !fetching && nextPage) {
      dispatch(setCommentsListAsync(post.id, nextPage));
    }
  };

  const handleDeletePost = (deletedPost) => {
    dispatch(deletePostAsync(deletedPost.id));
    router.push(`/users/${user.username}`);
  };

  const handleDeleteComment = (deletedComment) => dispatch(deleteCommentAsync(deletedComment.id));
  const handleEditComment = async (comment, changeComment) => await dispatch(changeCommentAsync(comment.id, changeComment));
  const handleEditPost = async (editPost, newPost) => await dispatch(changePostAsync(editPost.id, newPost));
  const handleCreateComment = (newComment) => dispatch(addCommentAsync(post.id, newComment));

  return (
    <MainLayout>
      <UserProfile/>
      <Posts onChange={handleEditPost}
             post={post}
             onDelete={handleDeletePost}/>
      <div className="w-100 d-flex mt-3 justify-content-center">
        <CreateCommentForm onSubmit={handleCreateComment}/>
      </div>
      <CommentsList onSubmit={handleEditComment} onDelete={handleDeleteComment}/>
    </MainLayout>
  );
}

export const getServerSideProps = withRedux(withAuth(async (ctx, { user }, { dispatch, getState }) => {
    try {
      await Promise.all([
        dispatch(setPostAsync(ctx.query.id)),
        dispatch(setCommentsListAsync(ctx.query.id)),
        dispatch(setPostId(ctx.query.id)),
      ]);

      const { posts: { post: { author } } } = getState();

      await dispatch(addUserAsync(author.username));

      return { props: {} };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
));