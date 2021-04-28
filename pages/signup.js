import {useRouter} from "next/router";
import {confirmUser, registerUser} from "../gateway/usersGateway";
import {Api} from "../utils/Api";

import MainLayout from "../components/layout/MainLayout";
import FormSignup from "../components/forms/FormSignup";
import Link from "next/link";

export default function Signup() {
    const router = useRouter();

    const handleSubmitForm = async (user) =>{
        const token = await registerUser(user);

        document.cookie = `token=${JSON.stringify(token)};path=/; max-age=${process.env.AUTH_TOKEN_LIFETIME}`;
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
        Api.setToken(context)
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
