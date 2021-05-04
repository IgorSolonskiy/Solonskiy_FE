import {useRouter} from "next/router";
import {loginUser} from "../gateway/usersGateway";
import {withoutAuth} from "../hof/withoutAuth";

import MainLayout from "../components/layout/MainLayout";
import FormLogin from "../components/forms/FormLogin";
import Link from "next/link";
import cookies from "../helpers/cookie";

export default function Login() {
    const router = useRouter();

    const handleSubmitForm = async (user) => {
        const token = await loginUser(user);

        cookies.set('token', token, process.env.AUTH_TOKEN_LIFETIME);
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

export const getServerSideProps = withoutAuth();
