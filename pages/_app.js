import {Api} from "../utils/Api";

export default function MyApp({Component, pageProps,token}) {
    Api.setToken(token);
    return (<Component {...pageProps} />)
}

MyApp.getInitialProps = async (appContext) => {
    const token = appContext.ctx.req.cookies.token;

    Api.setToken(token);
    return {token};
}