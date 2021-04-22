import Btn from "../btn/Btn";
import {logoutUser} from "../../gateway/usersGateway";
import {useRouter} from "next/router";
import cookies from "next-cookies";


export default function MainLayout({children, user = ''}) {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        document.cookie = `jwt=${JSON.stringify(cookies(document.cookie).jwt)}; path=/; max-age=0`;
        router.push('/login');
    }

    return (
        <div className="container d-flex align-items-start">
            <main className="min-vh-100 d-flex flex-column align-items-center justify-content-start w-75 m-auto">
                {children}
            </main>
            {user && <Btn name='Sign out' classBtn='btn btn-outline-secondary mt-3' onClick={handleLogout}/>}
        </div>
    )
}