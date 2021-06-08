import {Api} from "../api";
import apiServer from "../libs/apiServer";

export const withoutAuth = getServerSideProps => async (ctx) => {
  try {
    const { token } = ctx.req.cookies;

    apiServer.defaults.headers["Authorization"] = `Bearer ${token}`;

    const profile = await Api.Profile.getProfile();

    return {
      redirect: {
        destination: `/users/${profile.username}`,
        permanent: false,
      }
    };
  } catch (e) {
    if (getServerSideProps) {
      const result = await getServerSideProps(ctx);
      return {
        ...result,
        props: {}
      };
    }

    return { props: {} };
  }
};

