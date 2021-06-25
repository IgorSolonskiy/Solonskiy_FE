import {useRouter} from "next/router";
import {getProfile} from "../../store/profile/actions";
import {Api} from "../../api";
import {useQuery} from "@redux-requests/react";

import Link from "next/link";
import Btn from "../btn/Btn";

export default function MainLayout({children}) {
    const {data: {profile}} = useQuery(getProfile());
    const {query: {username}} = useRouter();
    const router = useRouter();

    const handleLogout = async () => {
        await Api.Users.logout();
        router.push("/login");
    };

    const handleBackHome = () => profile.username === username ? window.scroll({top: '0px'}) : router.push(`/users/${profile.username}`)

    return (
        <div
            className="container-fluid justify-content-center d-flex align-items-start  p-0 pb-3 min-vh-100">
            <main
                className="d-flex align-items-start justify-content-between w-75 m-auto position-relative ">
                <div style={{zIndex: 30, width: '100px'}}
                     className="mx-3 d-flex flex-column align-items-start position-fixed">
                   <span
                       onClick={handleBackHome}
                       className="btn btn-outline-secondary mt-2">Home</span>
                    <Link shallow={true} href={`/users?page=1`}><span
                        className="btn btn-outline-secondary mt-2">Users</span></Link>
                    <Link href="/profile" shallow={true} scroll={true}><span
                        onClick={() => window.scroll({top: 0})}
                        className="btn btn-outline-secondary mt-2">Profile</span></Link>
                </div>
                <div style={{marginLeft: "200px"}}
                     className="d-flex flex-column w-100 align-items-center vh-100 pb-3">
                    {children}
                </div>
                <Btn type="button" name="Sign out"
                     classBtn="btn btn-outline-secondary mt-3 position-fixed"
                     style={{
                         width: "150px",
                         right: "40px",
                     }}
                     onClick={handleLogout}/>
            </main>
        </div>
    );
}