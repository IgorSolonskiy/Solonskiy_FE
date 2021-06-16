import {Pagination, Spin} from "antd";
import {getUsers} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

import UserInfo from "../user/UserInfo";

export default function UsersList({onPaginationChange, page}) {
    const {data: {users, total, perPage, currentPage}, loading} = useQuery(getUsers(page));

    const controls = loading ? <div
        className="w-100 h-100 d-flex align-items-center justify-content-center">
        <Spin size="large"/>
    </div> : users.map(user => <UserInfo user={user} key={user.id}/>);

    return (
        <div className="d-flex flex-column w-100 flex-grow-1 align-items-center">
            {controls}
            <Pagination current={currentPage}
                        pageSize={perPage}
                        total={total}
                        onChange={onPaginationChange}
                        style={{
                            zIndex: 1,
                        }}
                        className=" mb-3"/>
        </div>
    );
}