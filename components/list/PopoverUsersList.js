import {Pagination} from "antd";

import UserPopover from '../user/UserPopover';
import Spinner from "../spinner/Spinner";

export default function PopoverUsersList({onPaginationChange, usersPaginateData}) {
    const {users, total, perPage, currentPage} = usersPaginateData

    const paginateControll = perPage < total ?
        <Pagination current={currentPage} pageSize={perPage} total={total} onChange={onPaginationChange}
                    style={{zIndex: 1,}} className=" mb-3"/> : ''

    const usersList = !users ?
        <Spinner/>
        :
        <>
            <div className='flex-grow-1 w-100'>
                {users.map(user => <UserPopover user={user} key={user.id}/>)}
            </div>
            {paginateControll}
        </>;

    return (
        <div className="d-flex flex-column w-100 flex-grow-1 align-items-center mt-3">
            {usersList}
        </div>
    );
}