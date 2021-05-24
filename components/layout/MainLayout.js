import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "../../store/profile";

import Link from "next/link";
import Btn from "../btn/Btn";

export default function MainLayout ({ children }) {
  const profile = useSelector(state => state.profile.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutUserAsync());
    router.push("/login");
  };

  return (
    <div
      className="container-fluid justify-content-center d-flex align-items-start overflow-hidden p-0 pb-3 vh-100">
      <main className="d-flex align-items-start justify-content-between w-75 m-auto">
        <div className="mx-3 w-25 d-flex flex-column align-items-center">
          <Link href={`/users/${profile.username}`}><span
            className="btn btn-outline-secondary mt-2">Home</span></Link>
          <Link href="/profile"><span
            className="btn btn-outline-secondary mt-2">Profile</span></Link>
        </div>
        <div className="d-flex flex-column w-100 align-items-center vh-100 pb-3">
          {children}
        </div>
      </main>
      <Btn type="button" name="Sign out" classBtn="btn btn-outline-secondary mt-3" onClick={handleLogout}/>
    </div>
  );
}