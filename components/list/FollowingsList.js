import {Pagination} from "antd";
import {getFollowings, getUser} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

import UserInfo from "../user/UserInfo";
import Spinner from "../spinner/Spinner";

export default function FollowingsList({onPaginationChange, page, onFollow, onUnfollow}) {
    const {data: {user}} = useQuery(getUser());
    const {data: {followings, total, perPage, currentPage}} = useQuery(getFollowings(page, user.username));

    const paginateControll = perPage < total ?
        <Pagination current={currentPage} pageSize={perPage} total={total} onChange={onPaginationChange}
                    style={{zIndex: 1,}} className=" mb-3"/> : ''

    const followingsList = !followings ?
        <Spinner/>
        :
        <>
            <div className='flex-grow-1 w-100'>
                {followings.map(user => <UserInfo onFollow={onFollow} onUnfollow={onUnfollow} user={user}
                                                  key={user.id}/>)}
            </div>
            {paginateControll}
        </>;


    return (
        <div className="d-flex flex-column w-100 flex-grow-1 align-items-center mt-3">
            {followingsList}
        </div>

    );
}