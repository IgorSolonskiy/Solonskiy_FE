import {Api} from "../utils/Api";
import {useEffect} from "react";

import Cookies from "../helpers/cookie";

export default function AuthCheck({children}) {

    useEffect(()=>{
        Api.setToken(Cookies.get('token'));
    },[children])

    return children;
}

