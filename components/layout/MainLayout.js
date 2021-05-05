import Btn from "../btn/Btn";
import {logoutUser} from "../../gateway/usersGateway";
import {useRouter} from "next/router";
import Cookies from 'js-cookie';


export default function MainLayout({children, user = ''}) {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        Cookies.remove('token');
        router.push('/login');
    }

    return (
        <div className="container d-flex align-items-start">
            <main className="min-vh-100 d-flex flex-column align-items-center justify-content-start w-75 m-auto">
                {children}
            </main>
            {user && <Btn type='button' name='Sign out' classBtn='btn btn-outline-secondary mt-3' onClick={handleLogout}/>}
        </div>
    )
}