import apiServer from "../utils/apiServer";
import {confirmUser} from "../gateway/usersGateway";

export const withoutAuth = (getServerSideProps) => {
    return async (ctx) => {
        try {
            const {token} = ctx.req.cookies
            apiServer.defaults.headers['Authorization'] = `Bearer ${token}`
            const user = await confirmUser();
            if (user) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
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