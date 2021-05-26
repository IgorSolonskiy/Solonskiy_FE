import { Avatar } from "../image/Avatar";

import Link from "next/link";

export default function UserInfo ({ user }) {
  return (
    <li className="card w-100 mb-3">
        <div className='d-flex justify-content-around'>
          <div className='card-img-top w-50'>
            <Avatar avatar={user.avatar} shape='square' name={user.name} size={120}/>
          </div>
          <div className="card-body w-100 p-0 pt-2">
            <h5 className="card-title">Name: {user.name}</h5>
            <h5 className="card-title">Login: {user.username}</h5>
            <Link href={`/users/${user.username}`}><span className="btn btn-primary">Page</span></Link>
          </div>
        </div>
    </li>
  );
}