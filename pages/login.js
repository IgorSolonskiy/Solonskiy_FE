import {useRouter} from "next/router";
import {withoutAuth} from "../hof/withoutAuth";
import {loginUserAsync} from "../store/profile";

import FormLogin from "../components/forms/FormLogin";
import Link from "next/link";
import AuthLayout from "../components/layout/AuthLayout";

export default function Login() {
    const router = useRouter();

    const handleLoginUser = async (user) => {
      await  loginUserAsync(user);
      router.push(`/`);
    };

    return (
        <AuthLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormLogin onSubmit={handleLoginUser}/>
                <Link href="/signup"><span className='btn btn-primary mt-2'>Sign up</span></Link>
            </div>
        </AuthLayout>
    )
}

export const getServerSideProps = withoutAuth();
