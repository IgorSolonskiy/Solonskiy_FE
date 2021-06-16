import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersList from "../../components/list/UsersList";
import {
    getUserAsync,
    getUsersAsync, searchUsersAsync,
} from "../../store/user/actions";

export default function Users() {
    const [page, setPage] = useState(1);
    const [searchName, setSearchName] = useState(false);
    const dispatch = useDispatch();

    const handleSearchUsers = (username) => {
        if (username) {
            setSearchName(username);
            return dispatch(searchUsersAsync(username));
        }

        setSearchName(false);
        setPage(1);
        return dispatch(getUsersAsync(1));
    };

    const handlePaginateUsers =async nextPage => {
       await dispatch(searchName ? searchUsersAsync(searchName, nextPage) : getUsersAsync(nextPage));
       setPage(nextPage)
    };

    return (
        <MainLayout onClick={setPage}>
            <UserProfile/>
            <div className="d-flex w-100 h-100">
                <UsersList page={page} onPaginationChange={handlePaginateUsers}/>
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
