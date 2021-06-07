import { getProfile } from "../api/profile";
import Api from "../libs/Api";

export const withoutAuth = getServerSideProps => async (ctx) => {
  try {
    const { token } = ctx.req.cookies;

    Api.defaults.headers["Authorization"] = `Bearer ${token}`;

    const profile = await getProfile();

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

