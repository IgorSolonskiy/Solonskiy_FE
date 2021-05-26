import { useSelector } from "react-redux";
import { Pagination } from "antd";

import UserInfo from "../user/UserInfo";

export default function UsersList ({ onChange }) {
  const users = useSelector((state) => state.users.users);
  const total = useSelector((state) => state.users.pagination.total);
  const perPage = useSelector((state) => state.users.pagination.perPage);

  return (
    <div className="d-flex flex-column w-100 flex-grow-1 align-items-center">
      <ul className="list-group w-100 mt-3 border border-bottom-0 flex-grow-1" style={{ minHeight: "760px" }}>
        {users.map(user => <UserInfo user={user} key={user.id}/>)}
      </ul>
      <Pagination defaultCurrent={1}
                  pageSize={perPage}
                  total={total}
                  onChange={onChange}
                  className=" mb-3"/>
    </div>
  );
}