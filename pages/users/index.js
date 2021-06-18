import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import SearchForm from "../../components/forms/SearchForm";
import UsersList from "../../components/list/UsersList";
import {getUserAsync} from "../../store/user/actions";
import {useRouter} from "next/router";

export default function Users() {
    const {query: {username, page}} = useRouter();
    const router = useRouter();

    const handleSearchUsers = async (searchName) => router.push(`/users?page=1${searchName ? `&username=${searchName}` : ''}`,undefined,{shallow: true});

    const handlePaginateUsers = async pageNumber => router.push(`/users?page=${pageNumber}${username ? `&username=${username}` : ''}`,undefined,{shallow:true});

    return (
        <MainLayout>
            <UserProfile/>
            <div className="d-flex w-100 h-100">
                <UsersList searchName={username} page={page} onPaginationChange={handlePaginateUsers}/>
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
        await dispatch(getUserAsync(user.username))

        return {props: {}};
    }));
