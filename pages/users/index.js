import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useState} from "react";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersList from "../../components/list/UsersList";
import {
    getUserAsync, getUsersAsync,
} from "../../store/user/actions";

export default function Users() {
    const [page, setPage] = useState(1);
    const [searchName, setSearchName] = useState('');

    const handleSearchUsers = async (username) => {
        setPage(1)
        setSearchName(username)
    };

    const handlePaginateUsers = async nextPage => setPage(nextPage);

    return (
        <MainLayout>
            <UserProfile/>
            <div className="d-flex w-100 h-100">
                <UsersList searchName={searchName} page={page} onPaginationChange={handlePaginateUsers}/>
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
