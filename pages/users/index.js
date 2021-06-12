import {Spin} from "antd";
import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useState} from "react";
import {useDispatch} from "react-redux";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersList from "../../components/list/UsersList";
import {
  getUserAsync, getUsers,
  getUsersAsync, searchUsersAsync,
} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

export default function Users() {
  const {data: {users}} = useQuery(getUsers());
  const [searchName, setSearchName] = useState(false);
  const dispatch = useDispatch();

  const handleSearchUsers = (username) => {
    if (username) {
      setSearchName(username);
      return dispatch(searchUsersAsync(username));
    }

    setSearchName(false);
    return dispatch(getUsersAsync(1));
  };

  const handlePaginateUsers = page => dispatch(
      searchName ? searchUsersAsync(searchName, page) : getUsersAsync(page));

  const usersLists = users ?
      <UsersList onPaginationChange={handlePaginateUsers}/>
      :
      <div
          className="w-100 h-100 d-flex align-items-center justify-content-center">
        <Spin size="large"/>
      </div>;

  return (
      <MainLayout>
        <UserProfile/>
        <div className="d-flex w-100 h-100">
          {usersLists}
          <div
              className="d-flex flex-column align-items-start w-50 position-relative h-75 mx-3">
            <SearchForm onSubmit={handleSearchUsers}/>
          </div>
        </div>
      </MainLayout>
  );
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, {user}, {dispatch}) => {
      await Promise.all([
        dispatch(getUsersAsync()),
        dispatch(getUserAsync(user.username)),
      ]);

      return {props: {}};
    }));
