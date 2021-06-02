import { useSelector } from "react-redux";
import { Avatar } from "../image/Avatar";

import Link from "next/link";

export default function UserProfile ({showControls}) {
  const user = useSelector(state => state.users.user);


  const returnBackLink = showControls ?
    <Link href={`/users/${user.username}`}>
      <span className="btn btn-outline-secondary my-3">&lArr;</span>
    </Link>
    : null;

  return (
    <div className="d-flex align-items-center justify-content-around w-100 mt-3 mb-3">
      <Avatar avatar={user.avatar}
              name={user.name}
              size={80}/>
      <div className="mx-3 h3">{user.name}</div>
      <div className="h3 mx-3">Login: {user.username}</div>
      {returnBackLink}
    </div>
  );
}