import {Api} from "../utils/Api";
import {useEffect} from "react";
import {confirmUser} from "../gateway/usersGateway";
import {useRouter} from "next/router";

import Cookies from "../helpers/cookie";

export default function Auth({children}) {
    const router = useRouter();

    useEffect(async () => {
        try {
            const token = Cookies.get('token');

            if(!token){
                return router.push('/login')
            }

            Api.setToken(token)
            await confirmUser()
            router.push('/')
        } catch (e) {
            router.push('/login')
        }
    }, [])

    return children;
}
