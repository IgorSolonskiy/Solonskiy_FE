import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";

import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import FormSearch from "../../components/forms/FormSearch";
import SearchUsersList from "../../components/list/SearchUsersList";
import {setPaginateUsersListAsync, setSearchUsersList, setSearchUsersListAsync} from "../../store/user";
import {useDispatch} from "react-redux";
import PaginateUsersList from "../../components/list/PaginateUsersList";
import {useEffect} from "react";


export default function Users({auth}) {
    const dispatch = useDispatch();
    const defaultPagePagination = 1;

    useEffect(()=>{
        dispatch(setPaginateUsersListAsync(defaultPagePagination));
    },[auth])

    const handleSearchUsers = (e) => dispatch(e.target.value
        ? setSearchUsersListAsync(e.target.value)
        : setSearchUsersList([]));

    const handlePaginateUsers = e =>dispatch(setPaginateUsersListAsync(e));;

    return (
        <MainLayout>
            <UserProfile/>
            <div className='d-flex w-100'>
                <PaginateUsersList onChange={handlePaginateUsers}/>
                <div className='d-flex flex-column align-items-end w-50 position-relative h-75 mx-3'>
                    <FormSearch onChange={handleSearchUsers}/>
                    <SearchUsersList />
                </div>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = withRedux(withAuth())
