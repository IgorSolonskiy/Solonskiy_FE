import apiServer from '../libs/apiServer';

import {setProfileAsync} from "../store/profile";
import {withRedux} from "./withRedux";

export const withAuth = (getServerSideProps =>  withRedux(async(ctx,storeData) => {
        const {token} = ctx.req.cookies
        if (token) {
            try {
                apiServer.defaults.headers['Authorization'] = `Bearer ${token}`
                await storeData.dispatch(setProfileAsync());

                const {profile: {profile: user}} = storeData.getState();
                const auth = {token,user}

                if (getServerSideProps) {
                    const result = await getServerSideProps(ctx, auth,storeData)
                    return {
                        ...result,
                        props: {
                            auth,
                            ...result.props
                        }
                    }
                }
                return {
                    props: {
                        auth,
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
    })
)