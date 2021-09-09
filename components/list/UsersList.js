import {Pagination} from "antd";
import {getUsers} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

import UserInfo from "../user/UserInfo";
import Spinner from "../spinner/Spinner";

export default function UsersList({onPaginationChange, page, searchName, onFollow, onUnfollow}) {
    const {data: {users, total, perPage, currentPage}} = useQuery(getUsers(page,searchName));

    const usersList = !users ?
        <Spinner/>
        :
        <>
            <div className='flex-grow-1 w-100'>
                {users.map(user => <UserInfo onFollow={onFollow} onUnfollow={onUnfollow} user={user} key={user.id}/>)}
            </div>
            <Pagination current={currentPage} pageSize={perPage} total={total} onChange={onPaginationChange}
                        style={{zIndex: 1,}} className=" mb-3"/>
        </>;

    return (
        <div className="d-flex flex-column w-100 flex-grow-1 align-items-center mt-3">
            {usersList}
        </div>
    );
}