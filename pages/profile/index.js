import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { setPostsListAsync } from "../../store/posts";
import { useDispatch } from "react-redux";
import { changeProfileAsync } from "../../store/profile";

import MainLayout from "../../components/layout/MainLayout";
import ProfileForm from "../../components/forms/ProfileForm";

export default function Profile () {
  const dispatch = useDispatch();

  const handleChangeProfile = async (updatedProfile, formik) => {
    await dispatch(changeProfileAsync(updatedProfile));
    formik.setFieldValue("avatar", "");
  };

  return (
    <MainLayout>
      <div className="container mt-3 ">
        <div className="main-body ">
          <ProfileForm onSubmit={handleChangeProfile}/>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = withRedux(withAuth(async (ctx, { user }, { dispatch }) => {
    try {
      await dispatch(setPostsListAsync(user.username));

      return { props: {} };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
));