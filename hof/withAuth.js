import { setProfileAsync } from "../store/profile";
import Api from "../libs/Api";

export const withAuth = getServerSideProps => (async (ctx, storeData) => {
  const { token } = ctx.req.cookies;
  if (token) {
    try {
      Api.defaults.headers["Authorization"] = `Bearer ${token}`;

      await storeData.dispatch(setProfileAsync());

      const { profile: { profile: user } } = storeData.getState();
      const auth = { token, user };

      if (getServerSideProps) {
        const result = await getServerSideProps(ctx, auth, storeData);
        return {
          ...result,
          props: {
            auth,
            ...result.props
          }
        };
      }
      return {
        props: {
          auth,
        }
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
});
