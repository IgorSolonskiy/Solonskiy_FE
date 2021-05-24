import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {addUserAsync, setUsersList, setUsersListAsync} from "../../store/user";
import {addOnePostListAsync, changePostAsync, deletePostAsync, setPostsListAsync} from "../../store/posts";
import {useDispatch, useSelector} from "react-redux";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";
import FormSearch from "../../components/forms/FormSearch";
import UsersList from "../../components/list/UsersList";

export default function Home() {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();

    const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));

    const handlePostCreate = (newPost, formikHelpers) => {
        dispatch(addOnePostListAsync(newPost));
        formikHelpers.resetForm(true);
    }

    const handleEditPost = async (editPost, newPost) => {
        await dispatch(changePostAsync(editPost.id, newPost))
    };

    const handleSearchUsers = (e) => dispatch(e.target.value
        ? setUsersListAsync(e.target.value)
        : setUsersList([]));

    const profile = !user ?
        <div className='d-flex align-items-start justify-content-between w-100'>
            <CreatePostForm onSubmit={handlePostCreate}/>
            <div>
                <FormSearch onChange={handleSearchUsers}/>
                <UsersList/>
            </div>
        </div> : null;

    const showControls = user ? 0 : 1;

    return (
        <MainLayout>
            <UserProfile/>
            {profile}
            <PostsList showControls={showControls} onChange={handleEditPost} onDelete={handlePostDelete}/>
        </MainLayout>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, auth, {dispatch}) => {
        try {
            await dispatch(setPostsListAsync(ctx.query.username));

            if (ctx.query.username !== auth.user.username) {
                await dispatch(addUserAsync(ctx.query.username))
            }

            return {props: {}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
))
