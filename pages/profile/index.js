import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";

import MainLayout from "../../components/layout/MainLayout";
import ProfileForm from "../../components/forms/ProfileForm";
import {Api} from "../../api";

export default function Profile() {
  const handleChangeProfile = async (updatedProfile) => Api.Profile.change(
      updatedProfile);

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