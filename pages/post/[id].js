import { useRouter } from "next/router";
import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { addUserAsync } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAsync, changeCommentAsync, deleteCommentAsync, setCommentsListAsync, } from "../../store/comments";
import { changePostAsync, deletePostAsync, setPostAsync, setPostId, } from "../../store/posts";

import MainLayout from "../../components/layout/MainLayout";
import Posts from "../../components/post/Post";
import UserProfile from "../../components/user/UserProfile";
import CommentsList from "../../components/list/CommentsList";
import CreateCommentForm from "../../components/forms/CreateCommentForm";

export default function Post () {
  const profile = useSelector(state => state.profile.profile);
  const post = useSelector(state => state.posts.post);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeletePost = (deletedPost) => {
    dispatch(deletePostAsync(deletedPost.id));
    router.push(`/users/${profile.username}`);
  };

  const handleDeleteComment = (deletedComment) => dispatch(deleteCommentAsync(deletedComment.id));
  const handleEditComment = async (comment, changeComment) => await dispatch(changeCommentAsync(comment.id, changeComment));
  const handleEditPost = async (editPost, newPost) => await dispatch(changePostAsync(editPost.id, newPost));
  const handleCreateComment = (newComment) => dispatch(addCommentAsync(post.id, newComment));

  const showControls = post.author.id === profile.id;

  return (
    <MainLayout>
      <UserProfile/>
      <Posts onChange={handleEditPost}
             showControls={showControls}
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

      if (author.id !== user.id) {
        await dispatch(addUserAsync(author.username));
      }

      return { props: {} };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
));