import Btn from "../btn/Btn";
import {logoutUser} from "../../api/users";
import {useRouter} from "next/router";
import Cookies from 'js-cookie';
import Profile from "../user/Profile";

export default function MainLayout({children}) {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        Cookies.remove('token');
        router.push('/login');
    }

    return (
        <div className="container-fluid justify-content-center d-flex align-items-start">
            <main className="min-vh-100 d-flex align-items-start justify-content-between w-75 m-auto">
                <Profile/>
                <div className='d-flex flex-column w-100 align-items-center'>
                    {children}
                </div>
            </main>
            <Btn type='button' name='Sign out' classBtn='btn btn-outline-secondary mt-3' onClick={handleLogout}/>
        </div>
    )
}