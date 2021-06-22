import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch, useSelector} from "react-redux";
import {
  getProfile,
  updateProfileAsync,
} from "../../store/profile/actions";

import MainLayout from "../../components/layout/MainLayout";
import ProfileForm from "../../components/forms/ProfileForm";
import PostsList from "../../components/list/PostsList";
import {
  deletePostAsync, getPosts, getPostsAsync, updatePostAsync,
} from "../../store/posts/actions";
import {getQuerySelector} from "@redux-requests/core";
import {useEffect} from "react";
import {Button} from "antd";
import {
  getFollowingAsync, getUser, getUserAsync, getUsers,
} from "../../store/user/actions";
import Link from "next/link";

export default function Profile() {

  const dispatch = useDispatch();
  const {data: {cursor}} = useSelector(getQuerySelector(getPosts()));
  const {data: {user}} = useSelector(getQuerySelector(getUser()));
  const {data:{profile:{followings,followers}}} = useSelector(getQuerySelector(getProfile()));

  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handleChangeProfile = (updatedProfile) => dispatch(updateProfileAsync(updatedProfile));

  const handlePostDelete = (deletedPost) => dispatch(
      deletePostAsync(deletedPost.id));

  const handleEditPost = async (editPost, newPost) => await dispatch(
      updatePostAsync(editPost.id, newPost));

  const handleInfiniteScroll = (e) => {
    const {scrollHeight, scrollTop} = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && cursor) {
      dispatch(getPostsAsync(user.username, cursor));
    }
  };

  return (
      <MainLayout>
        <div className="container mt-3 ">
          <div className="main-body ">
            <ProfileForm onSubmit={handleChangeProfile}/>
          </div>
          <div className="d-flex w-100 justify-content-center mt-2">
            <Link href={"/profile/following"}>
              <Button>{followings.length} Following</Button>
            </Link>
            <Link href={"/profile/followers"}>
              <Button
                  className="mx-3">{followers.length} Followers</Button>
            </Link>
          </div>
          <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
        </div>
      </MainLayout>
  );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, auth, {dispatch}) => {
          try {
            await Promise.all([
              dispatch(getPostsAsync(auth.user.username)),
              dispatch(getUserAsync(auth.user.username)),
              dispatch(getFollowingAsync(auth.user.username)),
            ]);

            return {props: {}};
          } catch (e) {
            return {
              notFound: true,
            };
          }
        },
    ));
