import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {useDispatch} from "react-redux";
import {changeProfileAsync} from "../../store/profile";

import MainLayout from "../../components/layout/MainLayout";
import FormProfile from "../../components/forms/FormProfile";

export default function Profile() {
    const dispatch = useDispatch();

    const handleChangeProfile =async (updatedProfile,formik) => {
        await dispatch(changeProfileAsync(updatedProfile))
        formik.setFieldValue("avatar", '')
    };

    return (
        <MainLayout>
            <div className="container mt-3 ">
                <div className="main-body ">
                    <FormProfile onSubmit={handleChangeProfile}/>
                </div>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = withRedux(withAuth())