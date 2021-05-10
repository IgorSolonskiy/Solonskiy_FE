import apiServer from "../libs/apiServer";
import {initializeStore} from "../store";
import {addProfileThunkCreator} from "../store/profile/asyncActions/asyncActions";

export const withoutAuth = (getServerSideProps) => {
    return async (ctx) => {
        try {
            const {token} = ctx.req.cookies;
            const reduxStore = initializeStore();
            const {dispatch} = reduxStore;

            apiServer.defaults.headers['Authorization'] = `Bearer ${token}`;
            await dispatch(addProfileThunkCreator());

            return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
            }
        } catch (e) {
            if (getServerSideProps) {
                const result = await getServerSideProps(ctx)
                return {
                    ...result,
                    props: {}
                }
            }

            return {props: {}}
        }
    }
}