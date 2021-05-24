import { useSelector } from "react-redux";
import UserInfo from "../user/UserInfo";

export default function UsersList () {
  const users = useSelector((state) => state.users.users);
  return (
    <ul className="list-group position-absolute h-50 overflow-hidden" style={{ zIndex: 30 }}>
      {users.map(user => <UserInfo user={user} key={user.id}/>)}
    </ul>
  );
}