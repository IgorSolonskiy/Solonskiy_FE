import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";
import {
    createPostAsync,
    deletePostAsync, getPostsFeed, getPostsFeedAsync,
    updatePostAsync,
} from "../../store/posts/actions";
import {
    getUser,
    getUserAsync,
} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";
import {Toaster} from "react-hot-toast";
import FollowMenu from "../../components/menu/FollowMenu";

export default function Home({auth}) {
    const [cursor, setCursor] = useState('');
    const [toasterShow, setToasterShow] = useState(false)
    const {data: {user}} = useQuery(getUser());
    const {data: {nextCursor}} = useQuery(getPostsFeed(auth.user.username === user.username ? '' : user.username, cursor));
    const dispatch = useDispatch();

    useEffect(() => setToasterShow(true))

    useEffect(() => {
        document.addEventListener("scroll", handleInfiniteScroll);

        return () => document.removeEventListener("scroll", handleInfiniteScroll);
    });

    const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost));

    const handlePostCreate = (newPost) => dispatch(createPostAsync(newPost));

    const handleEditPost = (editPost, newPost) => dispatch(updatePostAsync(editPost.id, newPost, cursor));

    const handleInfiniteScroll = async (e) => {
        const {scrollHeight, scrollTop} = e.target.documentElement;

        if (scrollHeight <= (scrollTop + window.innerHeight) && nextCursor) {
            setCursor(nextCursor)
        }
    };

    const profile = auth.user.id === user.id ? <CreatePostForm
        onSubmit={handlePostCreate}/> : <FollowMenu/>;

    return (
        <MainLayout>
            {toasterShow && <Toaster/>}
            <UserProfile/>
            {profile}
            <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
        </MainLayout>
    );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, auth, {dispatch}) => {
            try {
                const username = ctx.query.username === auth.user.username ? '' : ctx.query.username;

                await Promise.all([
                    dispatch(getPostsFeedAsync(username)),
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
