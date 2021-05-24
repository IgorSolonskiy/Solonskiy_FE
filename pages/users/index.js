import { Spin } from "antd";
import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaginateUsersDataAsync, setSearchUsersList, setSearchUsersListAsync } from "../../store/user";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersSearchList from "../../components/list/UsersSearchList";
import UsersPaginateList from "../../components/list/UsersPaginateList";

export default function Users ({ auth }) {
  const users = useSelector((state) => state.users.paginateUsersData.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPaginateUsersDataAsync(process.env.DEFAULT_PAGINATE_USERS_PAGE));
  }, [auth]);

  const handleSearchUsers = (e) => dispatch(e.target.value
    ? setSearchUsersListAsync(e.target.value)
    : setSearchUsersList([]));

  const handlePaginateUsers = e => dispatch(setPaginateUsersDataAsync(e));

  const usersLists = users ?
    <UsersPaginateList onChange={handlePaginateUsers}/>
    :
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <Spin size="large"/>
    </div>;

  return (
    <MainLayout>
      <UserProfile/>
      <div className="d-flex w-100 h-100">
        {usersLists}
        <div className="d-flex flex-column align-items-end w-50 position-relative h-75 mx-3">
          <SearchForm onChange={handleSearchUsers}/>
          <UsersSearchList/>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = withRedux(withAuth());
