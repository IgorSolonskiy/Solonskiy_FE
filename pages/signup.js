import {withRouter} from "next/router";
import {withoutAuth} from "../hof/withoutAuth";
import {registerUserAsync} from "../store/profile";
import {withRedux} from "../hof/withRedux";

import FormSignup from "../components/forms/FormSignup";
import Link from "next/link";
import AuthLayout from "../components/layout/AuthLayout";

export default withRouter(function Signup({router}) {
    const handleRegisterUser = user => registerUserAsync(user, router);

    return (
        <AuthLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormSignup onSubmit={handleRegisterUser}/>
                <Link href="/login"><span className='btn btn-primary mt-2'>Log in</span></Link>
            </div>
        </AuthLayout>
    )
})

export const getServerSideProps = withRedux(withoutAuth());