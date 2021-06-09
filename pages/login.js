import {useRouter} from "next/router";
import {withoutAuth} from "../hof/withoutAuth";
import toast, {Toaster} from "react-hot-toast";
import {Api} from "../api";

import LoginForm from "../components/forms/LoginForm";
import Link from "next/link";
import AuthLayout from "../components/layout/AuthLayout";

export default function Login() {
  const router = useRouter();

  const handleLoginUser = async user => {
    try {
      await Api.Users.login(user);
      router.push("/");
    } catch (e) {
      toast.error(
          "The username or password you entered is incorrect, please try again.");
    }
  };

  return (
      <AuthLayout>
        <div className="min-vh-100 d-flex flex-column justify-content-center">
          <Toaster/>
          <LoginForm onSubmit={handleLoginUser}/>
          <Link href="/signup"><span
              className="btn btn-primary mt-2">Sign up</span></Link>
        </div>
      </AuthLayout>
  );
}

export const getServerSideProps = withoutAuth();
