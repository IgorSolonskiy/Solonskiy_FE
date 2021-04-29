import {Api} from "../utils/Api";
import Auth from "../hoc/auth-check";

export default function MyApp({Component, pageProps}) {
    return (
        <Auth>
            <Component {...pageProps} />
        </Auth>
    )
}

MyApp.getInitialProps = async (appContext) => {
    Api.setToken(appContext.ctx.req.cookies.token);

    return {};
}