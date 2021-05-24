import {Avatar} from "../image/Avatar";

import Link from "next/link";

export default function PaginateUserInfo({user}) {
    return (
        <Link href={`/users/${user.username}`}>
            <li className="btn text-primary border shadow-lg m-3">
                <div className='d-flex align-items-center '>
                    <Avatar avatar={user.avatar} name={user.name} size={35}/>
                    <div className='ms-3 d-flex flex-column align-items-start' >
                        <div className='mb-3'>Name: {user.name}</div>
                        <div className='mb-3'>Login: {user.username}</div>
                    </div>
                </div>
            </li>
        </Link>
    )
}