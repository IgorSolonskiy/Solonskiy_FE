import {Spin} from "antd";
import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {getUserAsync} from "../../store/user/actions";
import {useRouter} from "next/router";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersList from "../../components/list/UsersList";
import {
  followUserAsync,
  getUserAsync, getUsers,
  getUsersAsync, searchUsersAsync, unfollowUserAsync,
} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

export default function Users() {
    const {query: {username , page}} = useRouter();
    const router = useRouter();

    const handleSearchUsers = async (searchName) => router.push(`/users?page=1${searchName ? `&username=${searchName}` : ''}`,undefined,{shallow: true});

  const handleFollowUser = username => dispatch(followUserAsync(username));

  const handleUnfollowUser = username => dispatch(unfollowUserAsync(username));

  const handlePaginateUsers = page => dispatch(
      searchName ? searchUsersAsync(searchName, page) : getUsersAsync(page));

  const usersLists = users ?
      <UsersList onFollow={handleFollowUser}
                 onUnfollow={handleUnfollowUser}
                 onPaginationChange={handlePaginateUsers}/>
      :
      <div
          className="w-100 h-100 d-flex align-items-center justify-content-center">
        <Spin size="large"/>
      </div>;

    return (
        <MainLayout>
            <UserProfile/>
            <div className="d-flex w-100 h-100">
                <UsersList searchName={username} page={page} onPaginationChange={handlePaginateUsers}/>
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
