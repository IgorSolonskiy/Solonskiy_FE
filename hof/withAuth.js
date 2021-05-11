import apiServer from '../libs/apiServer';

import {initializeStore} from "../store";
import {addProfileAsync} from "../store/profile";

export const withAuth = (getServerSideProps) => {
    return async (ctx) => {
        const {token} = ctx.req.cookies
        if (token) {
            try {
                apiServer.defaults.headers['Authorization'] = `Bearer ${token}`
                const reduxStore = initializeStore();
                const {dispatch} = reduxStore;

                await dispatch(addProfileAsync());

                const {profile: {profile: user}} = reduxStore.getState();
                const auth = {token,user}

                if (getServerSideProps) {
                    const result = await getServerSideProps(ctx, auth, dispatch, reduxStore)
                    return {
                        ...result,
                        props: {
                            initialReduxState: reduxStore.getState(),
                            auth,
                            ...result.props
                        }
                    }
                }
                return {
                    props: {
                        auth,
                        initialReduxState: reduxStore.getState()
                    }
                }
            } catch (e) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                }
            }
        }
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}