import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";
import {
  updateProfileAsync,
} from "../../store/profile/actions";

import MainLayout from "../../components/layout/MainLayout";
import ProfileForm from "../../components/forms/ProfileForm";
import PostsList from "../../components/list/PostsList";
import {
  changePostAsync,
  deletePostAsync, getPostsListAsync, setPostsList,
} from "../../store/posts/actions";
import {getQuerySelector} from "@redux-requests/core";
import {useEffect} from "react";
import {Button} from "antd";
import {
  addUserAsync,
  getFollowingAsync, setFollowing,
  setFollowings,
  setUser, setUsers,
} from "../../store/user/actions";
import Link from "next/link";

export default function Profile() {

  const dispatch = useDispatch();
  const {data: {cursor}} = useSelector(getQuerySelector(setPostsList()));
  const {data: {user}} = useSelector(getQuerySelector(setUser()));
  const data   = useSelector(getQuerySelector(setUsers()));
  console.log(data)
  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handleChangeProfile = (updatedProfile) => dispatch(
      updateProfileAsync(updatedProfile));

  const handlePostDelete = (deletedPost) => dispatch(
      deletePostAsync(deletedPost.id));

  const handleEditPost = async (editPost, newPost) => await dispatch(
      changePostAsync(editPost.id, newPost));

  const handleInfiniteScroll = (e) => {
    const {scrollHeight, scrollTop} = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && cursor) {
      dispatch(getPostsListAsync(user.username, cursor));
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
              <Button>{} Following</Button>
            </Link>
            <Link href={"/profile/followers"}>
              <Button
                  className="mx-3">{} Followers</Button>
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
              dispatch(getPostsListAsync(auth.user.username)),
              dispatch(addUserAsync(auth.user.username)),
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
