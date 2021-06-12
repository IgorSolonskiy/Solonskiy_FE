import {Pagination} from "antd";
import {getUsers} from "../../store/user/actions";
import {useQuery} from "@redux-requests/react";

import UserInfo from "../user/UserInfo";

export default function UsersList({onPaginationChange}) {
  const {data: {users, total, perPage, currentPage}} = useQuery(getUsers());

  return (
      <div className="d-flex flex-column w-100 flex-grow-1 align-items-center">
        <ul className="list-group w-100 mt-3 border border-bottom-0 flex-grow-1">
          {users.map(user => <UserInfo user={user} key={user.id}/>)}
        </ul>
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