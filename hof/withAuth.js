import apiServer from '../libs/apiServer';
import {getProfile} from "../api/users";

export const withAuth = (getServerSideProps) => {
    return async (ctx) => {
        const {token} = ctx.req.cookies
        if (token) {
            try {
                apiServer.defaults.headers['Authorization'] = `Bearer ${token}`
                const user = await getProfile();
                const auth = {token, user}
                if (getServerSideProps) {
                    const result = await getServerSideProps(ctx, auth)
                    return {
                        ...result,
                        props: {
                            auth,
                            ...result.props
                        }
                    }
                }
                return {props: {auth}}
            } catch (e) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                }
            }
        }
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
}