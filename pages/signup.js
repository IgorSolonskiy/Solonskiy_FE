import {useRouter} from "next/router";
import {confirmUser, registerUser} from "../gateway/usersGateway";

import MainLayout from "../components/layout/MainLayout";
import FormSignup from "../components/forms/FormSignup";
import Link from "next/link";
import Cookies from "../helpers/cookie";

export default function Signup() {
    const router = useRouter();

    const handleSubmitForm = async (user) => {
        const token = await registerUser(user);

        Cookies.set('token', token, process.env.AUTH_TOKEN_LIFETIME);
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
