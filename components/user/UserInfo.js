import Image from "next/image";
import Link from "next/link";

export default function UserInfo({user}) {
    return (
        <Link href={`/users/${user.username}`}>
            <li className="btn d-flex text-primary list-group-item list-group-item-action
            flex-column align-items-start justify-content-start border-bottom">
                <div className='d-flex align-items-center justify-content-center'>
                    <Image src={user.avatar ? user.avatar : '../defaultAvatar.png'} width={35} height={35}
                           className='rounded-circle'/>
                    <div className='ms-3'>
                        <div className='mb-3'>Name: {user.name}</div>
                        <div className='mb-3'>Login: {user.username}</div>
                    </div>
                </div>
            </li>
        </Link>
    )
}