import {withAuth} from "../../hof/withAuth";
import {addUserAsync, setUsersListAsync, userActions} from "../../store/user";
import {addOnePostListAsync, deletePostAsync, setPostsListAsync} from "../../store/posts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import FormPosts from "../../components/forms/FormPosts";
import FormSearch from "../../components/forms/FormSearch";
import UsersList from "../../components/list/UsersList";

export default function Profile() {
    const { users:{user,searchUsers}, posts:{posts}} = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect( ()=>dispatch(setUsersListAsync()),[posts])

    const handleDeleteClick = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));

    const handleCreateSumbit = (newPost, formikHelpers) => {
        dispatch(addOnePostListAsync(newPost));
        formikHelpers.resetForm(true);
    }

    const handleSearchUsers = (e) => {
        const newUsers = searchUsers.filter(({username}) => username.includes(e.target.value) )

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
)

