import {useSelector} from "react-redux";
import Link from "next/link";

export default function User() {
    const {user} = useSelector((state) => state.user)
    const {posts} = useSelector((state) => state.posts)

    return (
        <div className="d-flex flex-column   w-50">
            <Link href="/"><span className='btn btn-outline-success mt-2 w-25'>Home</span></Link>
            <h1 className='fs-3 m-0 mt-3'> {user.name}</h1>
            <div className='fs-3'>Number of posts: {posts.length}</div>
        </div>
    )
}