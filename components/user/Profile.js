import {useSelector} from "react-redux";
import Link from "next/link";

export default function Profile() {
    const {profile} = useSelector((state) => state.profile)

    return (
        <div className="d-flex flex-column w-25 align-items-start min-vh-100  ">
            <h1>{profile.name}</h1>
            <div className='h3'>Login:{profile.username}</div>
            <Link href="/signup"><span className='btn btn-primary mt-2'>Sign up</span></Link>
        </div>
    )
}