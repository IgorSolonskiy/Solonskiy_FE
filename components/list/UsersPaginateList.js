import { useSelector } from "react-redux";
import { Pagination } from "antd";

import UserInfo from "../user/UserInfo";

export default function UsersPaginateList ({ onChange }) {
  const users = useSelector((state) => state.users.paginateUsersData.data);
  const paginateInfo = useSelector((state) => state.users.paginateUsersData.meta);

  return (
    <div className="d-flex flex-column w-100 flex-grow-1 align-items-center">
      <ul className="list-group w-100 mt-3 border border-bottom-0 flex-grow-1 mb-3" style={{ minHeight: "760px" }}>
        {users.map(user => <UserInfo user={user} key={user.id}/>)}
      </ul>
      <Pagination defaultCurrent={1}
                  pageSize={paginateInfo.per_page}
                  total={paginateInfo.total}
                  onChange={onChange}
                  className="mt-3 mb-3"/>
    </div>
  );
}