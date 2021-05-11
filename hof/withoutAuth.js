import apiServer from "../libs/apiServer";
import {initializeStore} from "../store";
import {addProfileAsync} from "../store/profile";

export const withoutAuth = (getServerSideProps) => {
    return async (ctx) => {
        try {
            const {token} = ctx.req.cookies;
            const reduxStore = initializeStore();
            const {dispatch} = reduxStore;

            apiServer.defaults.headers['Authorization'] = `Bearer ${token}`;
            await dispatch(addProfileAsync());

            const {profile: {profile: user}} = reduxStore.getState();

            return {
                    redirect: {
                        destination: `/users/${user.username}`,
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