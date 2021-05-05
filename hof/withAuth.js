import apiServer from '../utils/apiServer';
import {confirmUser} from "../gateway/usersGateway";

export const withAuth = (getServerSideProps) => {
    return async (ctx) => {
        const { token } = ctx.req.cookies
        if (token) {
            try {
                apiServer.defaults.headers['Authorization'] = `Bearer ${token}`
                const user = await confirmUser();
                const auth = { token, user }
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
                return { props: { auth } }
            }
            catch (e) {
                return {
                    notFound: true,
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