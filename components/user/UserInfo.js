import {Avatar} from "../image/Avatar";

import Link from "next/link";
import {getProfile} from "../../store/profile/actions";
import {useQuery} from "@redux-requests/react";

export default function UserInfo({user, onFollow, onUnfollow}) {
  const {data: {profile: {followings, username}}} = useQuery(getProfile());

  const showControls = user.username !== username;

  const controls = followings.map(user => user.username).
      includes(user.username)
      ? <button onClick={() => onUnfollow(user.username)} type="button"
                className="btn btn-outline-danger mx-3">Unfollow
      </button>
      : <button onClick={() => onFollow(user.username)} type="button"
                className="btn btn-outline-info mx-3">Follow
      </button>
  ;

  return (
      <li className="card w-100 mb-3">
        <div className="d-flex justify-content-around">
          <div className="card-img-top w-50">
            <Avatar avatar={user.avatar} shape="square" name={user.name}
                    size={115}/>
          </div>
          <div className="card-body w-100 p-0 pt-2">
            <h5 className="card-title">Name: {user.name}</h5>
            <h5 className="card-title">Login: {user.username}</h5>
            <Link href={`/users/${user.username}`}><span
                className="btn btn-primary">Page</span></Link>
            {showControls && controls}
          </div>
        </div>
      </li>
  );
}