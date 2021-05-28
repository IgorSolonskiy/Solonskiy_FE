import { withAuth } from "../../hof/withAuth";
import { withRedux } from "../../hof/withRedux";
import { useDispatch } from "react-redux";
import { changeProfileAsync } from "../../store/profile";

import MainLayout from "../../components/layout/MainLayout";
import ProfileForm from "../../components/forms/ProfileForm";

export default function Profile () {
  const dispatch = useDispatch();

  const handleChangeProfile = async (updatedProfile,) => await dispatch(changeProfileAsync(updatedProfile));

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

export const getServerSideProps = withRedux(withAuth());