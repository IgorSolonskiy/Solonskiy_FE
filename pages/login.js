import {useState} from 'react';
import {useRouter} from "next/router";
import {confirmUser, loginUser} from "../gateway/userGateway";

import MainLayout from "../components/layout/MainLayout";
import FormLogin from "../components/forms/FormLogin";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChangeInput = (key, value) => {
        setUser(prevUser => {
            return {
                ...prevUser,
                [key]: value,
            }
        })
    }

    const handleSubmitForm = async (e) => {
            e.preventDefault();

            const token = await loginUser(user);

            document.cookie = `jwt=${JSON.stringify(token)};path=/; max-age=${60*60*24}`;
            router.push('/home');
    }

    return (
        <MainLayout>
            <FormLogin user={user}
                       onSubmit={handleSubmitForm}
                       onChange={handleChangeInput}/>
           <Link href="/signup"><span className='btn btn-primary mt-2'>Sign up</span></Link>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        await confirmUser(context);

        return {
            redirect: {
                destination: '/home',
                permanent: true,
            },
        }
    } catch (e) {
        return {
            props: {},
        }
    }
}