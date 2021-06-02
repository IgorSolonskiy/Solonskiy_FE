import {withAuth} from '../../hof/withAuth';
import {withRedux} from '../../hof/withRedux';
import {useDispatch, useSelector} from 'react-redux';
import {setPostsTagAsync} from '../../store/posts';
import {
  changePostAsync,
  deletePostAsync,
} from '../../store/posts';

import MainLayout from '../../components/layout/MainLayout';
import UserProfile from '../../components/user/UserProfile';
import {useEffect} from 'react';
import PostsList from '../../components/list/PostsList';
import {addUserAsync} from '../../store/user';

export default function PostsTag({tag}) {
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.posts.fetching);
  const nextPage = useSelector((state) => state.posts.pagination.nextPage);

  useEffect(() => {
    document.addEventListener('scroll', handleInfiniteScroll);

    return () => document.removeEventListener('scroll', handleInfiniteScroll);
  });

  const handlePostDelete = (deletedPost) => dispatch(
      deletePostAsync(deletedPost.id));
  const handleEditPost = async (editPost, newPost) => await dispatch(
      changePostAsync(editPost.id, newPost));

  const handleInfiniteScroll = (e) => {
    const {scrollHeight, scrollTop} = e.target.documentElement;

    if (scrollHeight <= (scrollTop + window.innerHeight) && !fetching &&
        nextPage) {

      dispatch(setPostsTagAsync(tag, nextPage));
    }
  };

  return (
      <MainLayout>
        <UserProfile showControls={true}/>
        <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
      </MainLayout>
  );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, {user}, {dispatch}) => {
          try {
            await dispatch(setPostsTagAsync(ctx.query.tag));
            await dispatch(addUserAsync(user.username));

            return {props: {tag: ctx.query.tag}};
          } catch (e) {
            return {
              notFound: true,
            };
          }
        },
    ));