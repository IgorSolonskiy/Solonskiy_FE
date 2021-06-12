import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {Tag} from "antd";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import PostsList from "../../components/list/PostsList";
import {
  deletePostAsync, getPosts,
  getPostsByTagAsync, updatePostAsync,
} from "../../store/posts/actions";
import {getUser} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

export default function PostsByTag({tag}) {
  const dispatch = useDispatch();
  const {data: {cursor, posts}} = useQuery(getPosts());

  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handlePostDelete = (deletedPost) => dispatch(
      deletePostAsync(deletedPost.id));
  const handleEditPost = async (editPost, newPost) => await dispatch(
      updatePostAsync(editPost.id, newPost));

  const handleInfiniteScroll = (e) => {
    const {scrollHeight, scrollTop} = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) &&
        cursor) {

      dispatch(getPostsByTagAsync(tag, cursor, posts));
    }
  };

  return (
      <MainLayout>
        <UserProfile showControls={true}/>
        <Tag style={{lineHeight: "30px", fontSize: "22px"}}
             color="geekblue">#{tag}</Tag>
        <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
      </MainLayout>
  );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, {user}, {dispatch}) => {
          try {
            await Promise.all([
              dispatch(getPostsByTagAsync(ctx.query.tag)),
              dispatch(getUser(user.username)),
            ]);

            return {props: {tag: ctx.query.tag}};
          } catch (e) {
            return {
              notFound: true,
            };
          }
        },
    ));