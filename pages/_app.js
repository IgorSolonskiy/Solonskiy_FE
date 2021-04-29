import {Api} from "../utils/Api";
import CookiesProvider from "../hoc/CookiesProvider";

export default function MyApp({Component, pageProps}) {
    return (
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>
    )
}

MyApp.getInitialProps = async (appContext) => {
    Api.setToken(appContext.ctx.req.cookies.token);

    return {};
}