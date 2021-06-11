import apiClient from "../libs/apiClient";
import {getProfileAsync} from "../store/profile/actions";

export const withAuth = getServerSideProps => (async (ctx, storeData) => {
  const {token} = ctx.req.cookies;
  if (token) {
    try {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      await storeData.dispatch(getProfileAsync());

      const data = storeData.getState();
      const user = data.requests.queries["PROFILE.GET_PROFILE"].data.profile;

      const auth = {token, user};

      if (getServerSideProps) {
        const result = await getServerSideProps(ctx, auth, storeData);
        return {
          ...result,
          props: {
            auth,
            ...result.props,
          },
        };
      }
      return {
        props: {
          auth,
        },
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
