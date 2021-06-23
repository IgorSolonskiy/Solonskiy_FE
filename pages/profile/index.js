import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";
import {updateProfileAsync,} from "../../store/profile/actions";
import {deletePostAsync, getPostsFeed, getPostsFeedAsync, updatePostAsync} from "../../store/posts/actions";
import {useEffect, useState} from "react";
import {getUser, getUserAsync} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

import MainLayout from "../../components/layout/MainLayout";
import ProfileForm from "../../components/forms/ProfileForm";
import PostsList from "../../components/list/PostsList";
import FollowMenu from "../../components/menu/FollowMenu";

export default function Profile() {
    const [cursor, setCursor] = useState('');
    const {data: {user: {username}}} = useQuery(getUser());
    const {data: {nextCursor}} = useQuery(getPostsFeed(username, cursor));
    const dispatch = useDispatch();

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

        if (scrollHeight <= (scrollTop + window.innerHeight) && nextCursor) {
            setCursor(nextCursor)
        }
    };

    return (
        <MainLayout>
            <div className="container mt-3 ">
                <div className="main-body ">
                    <ProfileForm onSubmit={handleChangeProfile}/>
                </div>
                <FollowMenu />
                <PostsList onChange={handleEditPost} onDelete={handlePostDelete}/>
            </div>
        </MainLayout>
    );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, auth, {dispatch}) => {
            try {
                await Promise.all([
                    dispatch(getPostsFeedAsync(auth.user.username)),
                    dispatch(getUserAsync(auth.user.username))
                ]);

                return {props: {}};
            } catch (e) {
                return {
                    notFound: true,
                };
            }
        },
    ));
