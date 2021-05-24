import apiServer from '../libs/apiServer';
import {getProfile} from "../api/profile";

export const withoutAuth = getServerSideProps => async (ctx) => {
    try {
        const {token} = ctx.req.cookies;

        apiServer.defaults.headers['Authorization'] = `Bearer ${token}`;

        const profile = await getProfile();

        return {
            redirect: {
                destination: `/users/${profile.username}`,
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

