import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import { useStore} from "../store";

export default function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
