import apiServer from "../libs/apiServer";

import {setProfileAsync} from "../store/profile";

export const withoutAuth = getServerSideProps => async (ctx, storeData) => {
    try {
        const {token} = ctx.req.cookies;

        apiServer.defaults.headers['Authorization'] = `Bearer ${token}`;
        await storeData.dispatch(setProfileAsync());

        const {profile: {profile: user}} = storeData.getState();

        return {
            redirect: {
                destination: `/users/${user.username}`,
                permanent: false,
            }
        }
    } catch (e) {
        if (getServerSideProps) {
            const result = await getServerSideProps(ctx,storeData)
            return {
                ...result,
                props: {}
            }
        }

        return {props: {}}
    }
}

