import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {ImageAvatar} from "../../components/image/ImageAvatar";
import {setPostsListAsync} from "../../store/posts";
import {useDispatch, useSelector} from "react-redux";
import {changeProfileAsync, setProfileId} from "../../store/profile";

import MainLayout from "../../components/layout/MainLayout";
import FormProfile from "../../components/forms/FormProfile";

export default function Profile() {
    const {profile: {profile, profileId}, posts: {posts}} = useSelector(state => state);
    const dispatch = useDispatch();

    const handleClickProfile = () => dispatch(setProfileId(profile.id));

    const handleChangeProfile = (updatedProfile) => {
        dispatch(setProfileId(null))
        dispatch(changeProfileAsync(updatedProfile))
    }

    return (
        <MainLayout>
            <div className="container mt-3 ">
                <div className="main-body ">

                    <div className="row gutters-sm d-flex flex-column align-items-center">
                        <div className="col-md-4 w-100 mb-3">
                            <div className="card">
                                <div className="card-body" style={{backgroundColor: '#B3E5FC'}}>
                                    <div className="d-flex flex-column align-items-center text-center"
                                         style={{backgroundColor: '#B3E5FC'}}>
                                        <ImageAvatar profile={profile}
                                                     width={150}
                                                     height={150}
                                                     className={'rounded-circle'}/>
                                        <div className="mt-3">
                                            <h4>{profile.username}</h4>
                                            <p className="text-secondary mb-1">Posts: {posts.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 w-100">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {profile.name}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {profile.email}
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                                {!profileId &&
                                <button type="button" onClick={handleClickProfile} className="btn btn-outline-info">Set
                                    up profile</button>}
                                {profileId && <FormProfile onSubmit={handleChangeProfile}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, {user}, {dispatch}) => {
        try {
            await dispatch(setPostsListAsync(user.username));

            return {props: {}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
))