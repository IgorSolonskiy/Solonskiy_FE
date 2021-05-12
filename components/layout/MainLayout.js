import {logoutUser} from "../../api/users";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

import Cookies from 'js-cookie';
import Link from "next/link";
import Btn from "../btn/Btn";

export default function MainLayout({children}) {
    const {profile} = useSelector(state => state.profile);
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        Cookies.remove('token');
        router.push('/login');
    }

    return (
        <div className="container-fluid justify-content-center d-flex align-items-start overflow-hidden p-0 pb-3 vh-100">
            <main className="d-flex align-items-start justify-content-between w-75 m-auto">
                <div className='mx-3 w-25'>
                    <Link href={`/users/${profile.username}`}><span
                        className='btn btn-outline-secondary mt-2'>HOME</span></Link>
                </div>
                <div className='d-flex flex-column w-100 align-items-center vh-100 pb-3'>
                    {children}
                </div>
            </main>
            <Btn type='button' name='Sign out' classBtn='btn btn-outline-secondary mt-3' onClick={handleLogout}/>
        </div>
    )
}