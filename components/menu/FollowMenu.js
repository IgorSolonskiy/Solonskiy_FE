import Link from "next/link";
import {Button} from "antd";
import {useQuery} from "@redux-requests/react";
import {getUser} from "../../store/user/actions";

export default function FollowMenu() {
    const {data: {user: {followings, followers, username}}} = useQuery(getUser());

    return (
        <div className="d-flex w-100 justify-content-center mt-2">
            <Link href={`/users/${username}/followings`}>
                <Button>{followings.length} Following</Button>
            </Link>
            <Link href={`/users/${username}/followers`}>
                <Button
                    className="mx-3">{followers.length} Followers</Button>
            </Link>
        </div>
    )
}