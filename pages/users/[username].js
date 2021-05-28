import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { addUserAsync } from "../../store/user";
import { addOnePostListAsync, changePostAsync, deletePostAsync, setPostsListAsync } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";

export default function Home ({ auth }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const fetching = useSelector((state) => state.posts.fetching);
  const lastPage = useSelector((state) => state.posts.pagination.lastPage);
  const currentPage = useSelector((state) => state.posts.pagination.currentPage);
  const postAuthor = user ? user.username : auth.user.username;

  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));
  const handlePostCreate = (newPost) => dispatch(addOnePostListAsync(newPost));
  const handleEditPost = async (editPost, newPost) => await dispatch(changePostAsync(editPost.id, newPost));

  const handleInfiniteScroll = (e) => {
    const { scrollHeight, scrollTop } = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && !fetching && currentPage < lastPage) {
      dispatch(setPostsListAsync(postAuthor, currentPage + 1));
    }
  };

  const profile = !user ? <CreatePostForm onSubmit={handlePostCreate}/> : null;

  return (
    <MainLayout>
      <UserProfile/>
      {profile}
      <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
    </MainLayout>
  );
}

export const getServerSideProps = withRedux(withAuth(async (ctx, auth, { dispatch }) => {
    try {
      await dispatch(setPostsListAsync(ctx.query.username));

      if (ctx.query.username !== auth.user.username) {
        await dispatch(addUserAsync(ctx.query.username));
      }

      return { props: {} };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
));
