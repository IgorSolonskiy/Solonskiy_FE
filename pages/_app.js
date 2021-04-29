import Auth from "../hoc/auth-check";

export default function MyApp({Component, pageProps}) {
    return (<Auth><Component {...pageProps} /></Auth>)
}
