import {useRouter} from "next/router";
import {loginUser} from "../api/users";
import {withoutAuth} from "../hof/withoutAuth";

import FormLogin from "../components/forms/FormLogin";
import Link from "next/link";
import Cookies from 'js-cookie'
import AuthLayout from "../components/layout/AuthLayout";

export default function Login() {
    const router = useRouter();

    const handleSubmitForm = async (user) => {
        const token = await loginUser(user);

        Cookies.set('token', token);
        router.push('/');
    }

    return (
        <AuthLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormLogin onSubmit={handleSubmitForm}/>
                <Link href="/signup"><span className='btn btn-primary mt-2'>Sign up</span></Link>
            </div>
        </AuthLayout>
    )
}

export const getServerSideProps = withoutAuth();
