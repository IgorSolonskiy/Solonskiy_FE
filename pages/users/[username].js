import {withAuth} from "../../hof/withAuth";
import {addUserAsync, setUsersListAsync, userActions} from "../../store/user";
import {addOnePostListAsync, deletePostAsync, setPostsListAsync} from "../../store/posts";
import {useDispatch, useSelector} from "react-redux";
import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import FormPosts from "../../components/forms/FormPosts";
import FormSearch from "../../components/forms/FormSearch";
import UsersList from "../../components/list/UsersList";

export default function Profile({usersList}) {
    const {user} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleDeleteClick = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));

    const handleCreateSumbit = (newPost, formikHelpers) => {
        dispatch(addOnePostListAsync(newPost));
        formikHelpers.resetForm(true);
    }

    const handleSearchUsers = (e) => {
        const newUsers = usersList.filter(({username}) => username.includes(e.target.value))

        if (!e.target.value.length) {
            return dispatch(userActions.setVisible(false));
        }

        dispatch(userActions.setVisible(true));
        return dispatch(userActions.setUsersList(newUsers))
    }

    return (
        <MainLayout>
            <UserProfile/>
            {!user ?
                <div className='d-flex align-items-start justify-content-between w-100'>
                    <FormPosts onSubmit={handleCreateSumbit}/>
                    <div>
                        <FormSearch onChange={handleSearchUsers}/>
                        <UsersList/>
                    </div>
                </div> : ''
            }
            <PostsList onDelete={handleDeleteClick}/>
        </MainLayout>
    )
}

export const getServerSideProps = withAuth(async (ctx, auth, dispatch, reduxStore) => {
        try {
            await Promise.all([
                dispatch(setPostsListAsync(ctx.query.username)),
                dispatch(setUsersListAsync())
            ])

            if (ctx.query.username !== auth.user.username) {
                await dispatch(addUserAsync(ctx.query.username))
            }

            const {users: {users: usersList}} = reduxStore.getState();

            return {props: {usersList}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)

