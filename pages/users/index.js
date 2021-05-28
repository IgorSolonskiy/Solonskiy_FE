import { Spin } from "antd";
import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync, searchUsersAsync, setUser } from "../../store/user";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersList from "../../components/list/UsersList";

export default function Users () {
  const users = useSelector((state) => state.users.users);
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

  const handlePaginateUsers = page => dispatch(searchName ? searchUsersAsync(searchName, page) : getUsersAsync(page));

  const usersLists = users ?
    <UsersList onPaginationChange={handlePaginateUsers}/>
    :
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <Spin size="large"/>
    </div>;

  return (
    <MainLayout>
      <UserProfile/>
      <div className="d-flex w-100 h-100">
        {usersLists}
        <div className="d-flex flex-column align-items-start w-50 position-relative h-75 mx-3">
          <SearchForm onSubmit={handleSearchUsers}/>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = withRedux(withAuth(async (ctx, auth, { dispatch }) => {
  await Promise.all([
    dispatch(getUsersAsync()),
    dispatch(setUser(auth.user))
  ]);

  return { props: {} };
}));
