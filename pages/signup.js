import {useState} from 'react';
import {useRouter} from "next/router";
import {registerUser} from "../gateway/usersGateway";

import MainLayout from "../components/layout/MainLayout";
import FormSignup from "../components/forms/FormSignup";
import Link from "next/link";
import serverApi from "../utils/serverApi";
import cookies from "next-cookies";

export default function Signup() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        user_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChangeInput = (key,value) =>{
        setUser(prevUser=>{
            return {
                ...prevUser,
                [key]: value
            }
        })
    }

    const handleSubmitForm = async (e,user) =>{
        e.preventDefault();

        const token = await registerUser(user);

        document.cookie = `jwt=${JSON.stringify(token)}`;
        router.push('/');
    }

    return (
        <MainLayout>
            <div className='min-vh-100 d-flex flex-column justify-content-center'>
                <FormSignup onChange={handleChangeInput}
                            onSubmit={handleSubmitForm}
                            user={user}/>
                <Link href="/login"><span className='btn btn-primary mt-2'>Log in</span></Link>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        serverApi.defaults.headers.common['Authorization'] = `Bearer ${cookies(context).jwt}`;

        const user = await serverApi.get('/profile');

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
