import { Spin } from "antd";
import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaginateUsersDataAsync, setSearchUsersListAsync } from "../../store/user";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersList from "../../components/list/UsersList";

export default function Users ({ auth }) {
  const users = useSelector((state) => state.users.paginateUsersData.data);
  const [filter, setFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPaginateUsersDataAsync(process.env.DEFAULT_PAGINATE_USERS_PAGE));
  }, [auth]);

  const handleSearchUsers = (username,formikHelpers) => {
    setFilter(() => username);
    dispatch(setSearchUsersListAsync(username));
    formikHelpers.resetForm();
  };

  const handleDeleteFilters = () => {
    setFilter(() => false);
    dispatch(setPaginateUsersDataAsync());
  };

  const handlePaginateUsers = e => dispatch(setPaginateUsersDataAsync(e));

  const usersLists = users ?
    <UsersList onChange={handlePaginateUsers}/>
    :
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <Spin size="large"/>
    </div>;

  const searchFilters = filter ?
    <div
      className="border mt-1 rounded border-success text-success p-1 d-flex justify-content-center align-items-center">
        <span className="ps-2" style={{ fontSize: "22px" }}>
          {filter}
        </span>
      <span className="btn btn-success ms-2 p-0" onClick={handleDeleteFilters}>
          &#10008;
        </span>
    </div>
    : null;

  return (
    <MainLayout>
      <UserProfile/>
      <div className="d-flex w-100 h-100">
        {usersLists}
        <div className="d-flex flex-column align-items-start w-50 position-relative h-75 mx-3">
          <SearchForm onSubmit={handleSearchUsers}/>
          {searchFilters}
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = withRedux(withAuth());
