import Link from "next/link";

export default function UserInfo( {children, user, postNumber}) {
    return (
        <section className='d-flex w-100 flex-column align-items-center mt-5'>
            <div className="d-flex align-items-center fs-3">
                <div className="font-monospace">{user.email}</div>
                <div className="ms-5">number of posts : {postNumber}</div>
                <Link href="/home"><span className='btn btn-outline-success ms-5'>Home</span></Link>
            </div>
            {children}
        </section>
    )
}