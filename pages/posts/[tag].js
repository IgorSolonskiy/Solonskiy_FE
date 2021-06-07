import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { useDispatch, useSelector } from "react-redux";
import { changePostAsync, deletePostAsync, getPostsByTagAsync } from "../../store/posts";
import { useEffect } from "react";
import { Tag } from "antd";
import { addUserAsync } from "../../store/user";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import PostsList from "../../components/list/PostsList";

export default function PostsTag ({ tag }) {
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.posts.fetching);
  const cursor = useSelector((state) => state.posts.pagination.cursor);

  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handlePostDelete = (deletedPost) => dispatch(
    deletePostAsync(deletedPost.id));
  const handleEditPost = async (editPost, newPost) => await dispatch(
    changePostAsync(editPost.id, newPost));

  const handleInfiniteScroll = (e) => {
    const { scrollHeight, scrollTop } = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && !fetching &&
      cursor) {

      dispatch(getPostsByTagAsync(tag, cursor));
    }
  };

  return (
    <MainLayout>
      <UserProfile showControls={true}/>
      <Tag style={{ lineHeight: "30px", fontSize: "22px" }}
           color="geekblue">#{tag}</Tag>
      <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
    </MainLayout>
  );
}

export const getServerSideProps = withRedux(
  withAuth(async (ctx, { user }, { dispatch }) => {
      try {
        await Promise.all([
          dispatch(getPostsByTagAsync(ctx.query.tag)),
          dispatch(addUserAsync(user.username)),
        ]);

        return { props: { tag: ctx.query.tag } };
      } catch (e) {
        return {
          notFound: true,
        };
      }
    },
  ));