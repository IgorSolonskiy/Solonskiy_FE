import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {getQuerySelector} from "@redux-requests/core";
import {setProfile} from "../../store/profile/actions";
import {Api} from "../../api";

import Link from "next/link";
import Btn from "../btn/Btn";

export default function MainLayout({children}) {
  const {data: {profile}} = useSelector(getQuerySelector(setProfile()));
  const router = useRouter();

  const handleLogout = async () => {
    await Api.Users.logout();
    router.push("/login");
  };

  return (
      <div
          className="container-fluid justify-content-center d-flex align-items-start  p-0 pb-3 min-vh-100">
        <main
            className="d-flex align-items-start justify-content-between w-75 m-auto position-relative ">
          <div style={{zIndex: 30}}
               className="mx-3 w-25 d-flex flex-column align-items-start position-fixed">
            <Link href={`/users/${profile.username}`}><span
                className="btn btn-outline-secondary mt-2">Home</span></Link>
            <Link href={`/users`}><span
                className="btn btn-outline-secondary mt-2">Users</span></Link>
            <Link href="/profile"><span
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