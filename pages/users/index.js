import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useRouter} from "next/router";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersList from "../../components/list/UsersList";
import {
    followUserAsync,
    getUserAsync, unfollowUserAsync,
} from "../../store/user/actions";
import {useDispatch} from "react-redux";

export default function Users() {
    const {query: {username, page}} = useRouter();
    const dispatch = useDispatch();
    const router = useRouter();


    const handleFollowUser = followUsername => dispatch(followUserAsync(followUsername));

    const handleUnfollowUser = unfollowUsername => dispatch(unfollowUserAsync(unfollowUsername));

    const handleSearchUsers = async (searchName) => router.push(`/users?page=1${searchName ? `&username=${searchName}` : ''}`, undefined, {shallow: true});

    const handlePaginateUsers = async pageNumber => router.push(`/users?page=${pageNumber}${username ? `&username=${username}` : ''}`, undefined, {shallow: true});

    return (
        <MainLayout>
            <UserProfile />
            <div className="d-flex w-100 h-100">
                <UsersList searchName={username} onFollow={handleFollowUser}
                           onUnfollow={handleUnfollowUser}
                           onPaginationChange={handlePaginateUsers} page={page}
                           onPaginationChange={handlePaginateUsers}/>
                <div
                    className="d-flex flex-column align-items-start w-50 position-relative h-75 mx-3">
                    <SearchForm searchUser={username} onSubmit={handleSearchUsers}/>
                </div>
            </div>
        </MainLayout>
    );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, {user}, {dispatch}) => {
        await dispatch(getUserAsync(user.username))

        return {props: {}};
    }));
