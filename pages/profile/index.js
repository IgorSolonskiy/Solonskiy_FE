import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch, useSelector} from "react-redux";
import {changeProfileAsync} from "../../store/profile/actions";

import MainLayout from "../../components/layout/MainLayout";
import ProfileForm from "../../components/forms/ProfileForm";
import PostsList from "../../components/list/PostsList";
import {
  changePostAsync,
  deletePostAsync, getPostsListAsync, setPostsList,
} from "../../store/posts/actions";
import {getQuerySelector} from "@redux-requests/core";
import {useEffect} from "react";

export default function Profile({auth}) {

  const dispatch = useDispatch();
  const {data: {cursor}} = useSelector(getQuerySelector(setPostsList()));

  useEffect(() => {
    document.addEventListener("scroll", handleInfiniteScroll);

    return () => document.removeEventListener("scroll", handleInfiniteScroll);
  });

  const handleChangeProfile = (updatedProfile) => dispatch(
      changeProfileAsync(updatedProfile));

  const handlePostDelete = (deletedPost) => dispatch(
      deletePostAsync(deletedPost.id));

  const handleEditPost = async (editPost, newPost) => await dispatch(
      changePostAsync(editPost.id, newPost));

  const handleInfiniteScroll = (e) => {
    const {scrollHeight, scrollTop} = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && cursor) {
      dispatch(getPostsListAsync(auth.user.username, cursor));
    }
  };

  return (
      <MainLayout>
        <div className="container mt-3 ">
          <div className="main-body ">
            <ProfileForm onSubmit={handleChangeProfile}/>
          </div>
          <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
        </div>
      </MainLayout>
  );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, auth, {dispatch}) => {
          try {
            await dispatch(getPostsListAsync(auth.user.username));

            return {props: {}};
          } catch (e) {
            return {
              notFound: true,
            };
          }
        },
    ));
