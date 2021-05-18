import {withRouter} from "next/router";
import {withoutAuth} from "../hof/withoutAuth";
import {loginUserAsync} from "../store/profile";
import {withRedux} from "../hof/withRedux";

import FormLogin from "../components/forms/FormLogin";
import Link from "next/link";
import AuthLayout from "../components/layout/AuthLayout";

export default withRouter(function Login({router}) {
    const handleLoginUser = user => loginUserAsync(user, router);

    return (
        <AuthLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormLogin onSubmit={handleLoginUser}/>
                <Link href="/signup"><span className='btn btn-primary mt-2'>Sign up</span></Link>
            </div>
        </AuthLayout>
    )
})

export const getServerSideProps = withRedux(withoutAuth());
