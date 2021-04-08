import {useState} from 'react';
import {useRouter} from "next/router";
import {confirmUser, registerUser} from "../gateway/userGateway";

import MainLayout from "../components/layout/MainLayout";
import FormSignup from "../components/forms/FormSignup";
import Link from "next/link";

export default function Signup() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
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
            router.push('/home');
    }

    return (
        <MainLayout>
            <div className='h-100 d-flex flex-column justify-content-center'>
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
        await confirmUser(context);

        return {
            redirect: {
                destination: '/home',
                permanent: false,
            },
        }
    } catch (e) {
        return {
            props: {},
        }
    }
}
