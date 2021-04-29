import {Api} from "../utils/Api";

export default function MyApp({Component, pageProps}) {
    return (<Component {...pageProps} />)
}

MyApp.getInitialProps = async (appContext) => {
    Api.setToken(appContext.ctx.req.cookies.token);

    return {};
}