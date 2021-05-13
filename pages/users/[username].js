import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {addUserAsync, setUsersList, setUsersListAsync} from "../../store/user";
import {addOnePostListAsync, deletePostAsync, setPostsListAsync} from "../../store/posts";
import {useDispatch, useSelector} from "react-redux";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import FormPosts from "../../components/forms/FormPosts";
import FormSearch from "../../components/forms/FormSearch";
import UsersList from "../../components/list/UsersList";

export default function Profile() {
    const {user} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));

    const handlePostCreate = (newPost, formikHelpers) => {
        dispatch(addOnePostListAsync(newPost));
        formikHelpers.resetForm(true);
    }

    const handleSearchUsers = (e) => {
        if (!e.target.value) {
            return dispatch(setUsersList([]))
        }

        dispatch(setUsersListAsync(e.target.value))
    };

    return (
        <MainLayout>
            <UserProfile/>
            {!user ?
                <div className='d-flex align-items-start justify-content-between w-100'>
                    <FormPosts onSubmit={handlePostCreate}/>
                    <div>
                        <FormSearch onChange={handleSearchUsers}/>
                        <UsersList/>
                    </div>
                </div> : ''
            }
            <PostsList onDelete={handlePostDelete}/>
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
                props: {}
            }
        }
        return {props: {}}
    }
))
