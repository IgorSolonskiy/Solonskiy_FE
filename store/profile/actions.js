import apiServer from "../../libs/apiServer";

export const profileActionTypes = {
    SET_PROFILE: 'PROFILE.SET_PROFILE',
}

export const profileActions = {
    setProfile: (payload) => ({type: profileActionTypes.SET_PROFILE, payload}),
}

export const addProfileAsync = () => async dispatch => {
    const {data: response} = await apiServer.get('profile');

    dispatch(profileActions.setProfile(response));
};