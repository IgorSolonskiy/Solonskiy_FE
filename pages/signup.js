import {useRouter} from "next/router";
import {registerUser} from "../api/users";
import {withoutAuth} from "../hof/withoutAuth";

import FormSignup from "../components/forms/FormSignup";
import Link from "next/link";
import Cookies from 'js-cookie';
import AuthLayout from "../components/layout/AuthLayout";

export default function Signup() {
    const router = useRouter();

    const handleSubmitForm = async (user) => {
        const token = await registerUser(user);

        Cookies.set('token', token);
        router.push('/');
    }

    return (
        <AuthLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormSignup onSubmit={handleSubmitForm}/>
                <Link href="/login"><span className='btn btn-primary mt-2'>Log in</span></Link>
            </div>
        </AuthLayout>
    )
}

export const getServerSideProps = withoutAuth();
