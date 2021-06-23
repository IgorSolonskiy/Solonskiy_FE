import {Pagination} from "antd";
import {getUsers} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

import UserInfo from "../user/UserInfo";
import Spinner from "../spinner/Spinner";

export default function UsersList({onPaginationChange, page, searchName}) {
    const {data: {users, total, perPage, currentPage}} = useQuery(getUsers(page,searchName));

    const usersList = !users ?
        <Spinner/>
        :
        <>
            {users.map(user => <UserInfo user={user} key={user.id}/>)}
            <Pagination current={currentPage} pageSize={perPage} total={total} onChange={onPaginationChange}
                        style={{zIndex: 1,}} className=" mb-3"/>
        </>;

    return (
        <div className="d-flex flex-column w-100 flex-grow-1 align-items-center">
            {usersList}
        </div>
    );
}