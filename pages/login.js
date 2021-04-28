import {useRouter} from "next/router";
import {confirmUser, loginUser} from "../gateway/usersGateway";
import {Api} from "../utils/Api";

import MainLayout from "../components/layout/MainLayout";
import FormLogin from "../components/forms/FormLogin";
import Link from "next/link";

export default function Login() {
    const router = useRouter();

    const handleSubmitForm = async (user) => {
        const token = await loginUser(user);

        document.cookie = `token=${JSON.stringify(token)};path=/; max-age=${process.env.AUTH_TOKEN_LIFETIME}`;
        router.push('/');
    }

    return (
        <MainLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormLogin onSubmit={handleSubmitForm}/>
                <Link href="/signup"><span className='btn btn-primary mt-2'>Sign up</span></Link>
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