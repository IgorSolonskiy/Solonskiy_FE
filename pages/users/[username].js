import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";
import {
    createPostAsync,
    deletePostAsync,
    getPosts,
    getPostsAsync, getPostsFeedAsync,
    updatePostAsync,
} from "../../store/posts/actions";
import {
    getUser,
    getUserAsync,
} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

export default function Home({auth}) {
    const dispatch = useDispatch();
    const {data: {user}} = useQuery(getUser());
    const {data: {cursor}} = useQuery(getPosts());

    useEffect(() => {
        document.addEventListener("scroll", handleInfiniteScroll);

        return () => document.removeEventListener("scroll", handleInfiniteScroll);
    });

    const handlePostDelete = (deletedPost) => dispatch(
        deletePostAsync(deletedPost.id));
    const handlePostCreate = (newPost) => dispatch(createPostAsync(newPost));
    const handleEditPost = async (editPost, newPost) => await dispatch(
        updatePostAsync(editPost.id, newPost));

    const handleInfiniteScroll = (e) => {
        const {scrollHeight, scrollTop} = e.target.documentElement;

        if (scrollHeight <= (scrollTop + window.innerHeight) && cursor) {
            dispatch(getPostsFeedAsync(cursor));
        }
    };

    const profile = auth.user.id === user.id ? <CreatePostForm
        onSubmit={handlePostCreate}/> : null;

    return (
        <MainLayout>
            <UserProfile/>
            {profile}
            <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
        </MainLayout>
    );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, auth, {dispatch}) => {
            try {
                await Promise.all([
                    ctx.query.username === auth.user.username
                        ? dispatch(getPostsFeedAsync())
                        : dispatch(getPostsAsync(ctx.query.username)),
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
