import Button from "../btn/Button";
import {logoutUser} from "../../gateway/usersGateway";
import {useRouter} from "next/router";
import cookies from "next-cookies";


export default function MainLayout({children,user=''}) {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        document.cookie = `jwt=${JSON.stringify(cookies(document.cookie).jwt)}; path=/; max-age=0`;
        router.push('/');
    }

    return (
        <div className="container d-flex" >
            <main className="min-vh-100 d-flex flex-column align-items-center justify-content-start w-100">
                {children}
            </main>
            {user && <Button name='Sign out' classBtn='btn btn-secondary h-25 mt-3' typeBtn='button' onClick={handleLogout}/>}
        </div>
    )
}