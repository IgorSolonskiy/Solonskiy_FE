import {useRouter} from "next/router";
import {confirmUser, registerUser} from "../gateway/usersGateway";

import MainLayout from "../components/layout/MainLayout";
import FormSignup from "../components/forms/FormSignup";
import Link from "next/link";
import serverApi from "../utils/serverApi";
import cookies from "next-cookies";

export default function Signup() {
    const router = useRouter();

    const handleSubmitForm = async (user) =>{
        const token = await registerUser(user);

        document.cookie = `jwt=${JSON.stringify(token)}`;
        router.push('/');
    }

    return (
        <MainLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormSignup onSubmit={handleSubmitForm}/>
                <Link href="/login"><span className='btn btn-primary mt-2'>Log in</span></Link>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        serverApi.defaults.headers.common['Authorization'] = `Bearer ${cookies(context).jwt}`;

        await confirmUser();

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    } catch (e) {
        return {
            props: {},
        }
    }
}
