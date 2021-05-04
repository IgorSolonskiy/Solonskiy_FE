import {useRouter} from "next/router";
import {registerUser} from "../gateway/usersGateway";
import {withoutAuth} from "../hof/withoutAuth";

import MainLayout from "../components/layout/MainLayout";
import FormSignup from "../components/forms/FormSignup";
import Link from "next/link";
import cookies from "../helpers/cookie";

export default function Signup() {
    const router = useRouter();

    const handleSubmitForm = async (user) =>{
        const token = await registerUser(user);

        cookies.set('token', token, process.env.AUTH_TOKEN_LIFETIME);
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

export const getServerSideProps = withoutAuth();
