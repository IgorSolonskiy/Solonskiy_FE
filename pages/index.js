import MainLayout from "../components/layout/MainLayout";
import Btn from "../components/btn/Btn";
import {useRouter} from "next/router";
import {confirmUser} from "../gateway/userGateway";

export default function Authentication(){
    const router = useRouter();

    const handleClickRoute = (route) =>{
        router.push(route);
    }

    return (<MainLayout>
            <section className="d-flex">
                <Btn name='Log in' classBtn='btn-primary' onClick={()=>handleClickRoute('login')}/>
                <Btn name="Sign up" classBtn='btn-success ms-3' onClick={()=>handleClickRoute('signup')}/>
            </section>
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