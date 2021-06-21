import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";
import {
    createPostAsync, deletePostAsync, getPosts, getPostsAsync, updatePostAsync,
} from "../../store/posts/actions";
import {
    getUser,
    getUserAsync,
} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";
import {useRouter} from "next/router";

export default function Home({auth}) {
    const {query: {cursor = ''}} = useRouter();
    const {data: {user}} = useQuery(getUser());
    const {data: {nextCursor}} = useQuery(getPosts(user.username, cursor));
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener("scroll", handleInfiniteScroll);

        return () => document.removeEventListener("scroll", handleInfiniteScroll);
    });

    const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));

    const handlePostCreate = (newPost) => dispatch(createPostAsync(newPost));

    const handleEditPost = async (editPost, newPost) => await dispatch(updatePostAsync(editPost.id, newPost, cursor));

    const handleInfiniteScroll = async (e) => {
        const {scrollHeight, scrollTop} = e.target.documentElement;

        if (scrollHeight <= (scrollTop + window.innerHeight) && nextCursor) {
            router.push(`/users/${user.username}${nextCursor ? `?cursor=${nextCursor}` : ''}`, undefined,
                {shallow: true})
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
                    dispatch(getPostsAsync(ctx.query.username)),
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
