import {useState} from 'react';
import {useRouter} from "next/router";
import {confirmUser, loginUser} from "../gateway/usersGateway";

import MainLayout from "../components/layout/MainLayout";
import FormLogin from "../components/forms/FormLogin";
import Link from "next/link";
import cookies from "next-cookies";
import serverApi from "../utils/serverApi";

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
        router.push('/');
    }

    return (
        <MainLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormLogin user={user}
                           onSubmit={handleSubmitForm}
                           onChange={handleChangeInput}/>
                <Link href="/signup"><span className='btn btn-primary mt-2'>Sign up</span></Link>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        serverApi.defaults.headers.common['Authorization'] = `Bearer ${cookies(context).jwt}`;

        await confirmUser();

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    } catch (e) {
        return {
            props: {},
        }
    }
}