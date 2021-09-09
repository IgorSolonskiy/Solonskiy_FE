import {Pagination} from "antd";
import {getFollowers, getUser} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

import UserInfo from "../user/UserInfo";
import Spinner from "../spinner/Spinner";

export default function FollowersList({onPaginationChange, page, onFollow, onUnfollow}) {
    const {data: {user}} = useQuery(getUser());
    const {data: {followers, total, perPage, currentPage}} = useQuery(getFollowers(page, user.username));

    const paginateControll = perPage < total ?
        <Pagination current={currentPage} pageSize={perPage} total={total} onChange={onPaginationChange}
                    style={{zIndex: 1,}} className=" mb-3"/> : ''

    const followerList = !followers ?
        <Spinner/>
        :
        <>
            <div className='flex-grow-1 w-100'>
                {followers.map(user => <UserInfo onFollow={onFollow} onUnfollow={onUnfollow} user={user}
                                                 key={user.id}/>)}
            </div>
            {paginateControll}
        </>;

    return (
        <div className="d-flex flex-column w-100 flex-grow-1 align-items-center mt-3">
            {followerList}
        </div>
    );
}