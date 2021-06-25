import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getUser, getUserAsync,} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";
import {Toaster} from "react-hot-toast";
import {
    createPostAsync,
    deletePostAsync,
    getPostsFeed,
    getPostsFeedAsync,
    likePostAsync,
    unlikePostAsync,
    updatePostAsync,
} from "../../store/posts/actions";
import {useRouter} from "next/router";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";
import FollowMenu from "../../components/menu/FollowMenu";

export default function Home({auth}) {
    const [cursor, setCursor] = useState('');
    const [toasterShow, setToasterShow] = useState(false)
    const {data: {user}} = useQuery(getUser());
    const {data: {nextCursor}} = useQuery(getPostsFeed(cursor));
    const {query: {username}} = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setToasterShow(true)
        setCursor('')
    }, [username])

    useEffect(() => {
        document.addEventListener("scroll", handleInfiniteScroll);

        return () => document.removeEventListener("scroll", handleInfiniteScroll);
    });

    const handleUnlikePost = (unlikedPost) => dispatch(unlikePostAsync(unlikedPost.id));

    const handleLikePost = (likedPost) => dispatch(likePostAsync(likedPost.id));

    const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost));

    const handlePostCreate = (newPost) => dispatch(createPostAsync(newPost));

    const handleEditPost = (editPost, newPost) => dispatch(updatePostAsync(editPost.id, newPost, cursor));


    const handleInfiniteScroll = async (e) => {
        const {scrollHeight, scrollTop} = e.target.documentElement;

        if (scrollHeight <= (scrollTop + window.innerHeight) && nextCursor) {
            await setCursor(nextCursor)
            await dispatch(getPostsFeedAsync(nextCursor, auth.user.username === user.username ? '' : user.username))
        }
    };

    const profile = auth.user.id === user.id ? <CreatePostForm onSubmit={handlePostCreate}/> : <FollowMenu/>;

    return (
        <MainLayout>
            {toasterShow && <Toaster/>}
            <UserProfile/>
            {profile}
            <PostsList onLike={handleLikePost} onUnlike={handleUnlikePost} onChange={handleEditPost}
                       onDelete={handlePostDelete}/>
        </MainLayout>
    );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, auth, {dispatch}) => {
            try {
                const username = ctx.query.username === auth.user.username ? '' : ctx.query.username;
                const cursor = '';

                await Promise.all([
                    dispatch(getPostsFeedAsync(cursor,username)),
                    dispatch(getUserAsync(ctx.query.username)),
                ]);

                return {props: {}};
            } catch (e) {

                return {
                    notFound: true,
                };
            }
        },
    ));
