import {useRouter} from "next/router";
import {withoutAuth} from "../hof/withoutAuth";
import {Api} from "../api";

import SignupForm from "../components/forms/SignupForm";
import Link from "next/link";
import AuthLayout from "../components/layout/AuthLayout";

export default function Signup() {
  const router = useRouter();

  const handleRegisterUser = async user => {
    await Api.Users.register(user);
    router.push("/");
  };

  return (
      <AuthLayout>
        <div className="min-vh-100 d-flex flex-column justify-content-center">
          <SignupForm onSubmit={handleRegisterUser}/>
          <Link href="/login"><span
              className="btn btn-primary mt-2">Log in</span></Link>
        </div>
      </AuthLayout>
  );
}

export const getServerSideProps = withoutAuth();