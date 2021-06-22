import {Avatar} from "../image/Avatar";
import {getProfile} from "../../store/profile/actions";
import {useQuery} from "@redux-requests/react";

import Link from "next/link";

export default function PreloadComment({comment}) {
    const {data: {profile}} = useQuery(getProfile());

    return (
        <li className="border card border-secondary list-group-item  mt-3" style={{opacity: '0.5'}}>
            <div className="w-100">
                <div className=" ms-2 me-auto">
                    <div className="d-flex justify-content-center">
                        <Avatar avatar={profile.avatar} name={profile.name}
                                size={40}/>
                        <Link href={`/users/${profile.username}`}>
                            <div
                                className=" btn fw-bold mt-2 mx-3 text-center text-uppercase card-header p-0">
                                {profile.username}
                            </div>
                        </Link>
                    </div>
                    <p className="mt-3" style={{whiteSpace: "pre"}}>
                        {comment.content}</p>
                </div>
            </div>
        </li>
    );
}
