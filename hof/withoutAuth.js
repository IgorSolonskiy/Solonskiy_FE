import apiServer from "../libs/apiServer";

export const withoutAuth = getServerSideProps => async (ctx) => {
    try {
        const {token} = ctx.req.cookies;

        apiServer.defaults.headers['Authorization'] = `Bearer ${token}`;

        const {data: response} = await apiServer.get('profile');

        return {
            redirect: {
                destination: `/users/${response.username}`,
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

