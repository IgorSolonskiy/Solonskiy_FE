import apiServer from "../../libs/apiServer";
import apiClient from "../../libs/apiClient";
import Cookies from 'js-cookie';

export const profileActionTypes = {
    SET_PROFILE: 'PROFILE.SET_PROFILE',
    SET_PROFILE_ID: 'PROFILE.SET_PROFILE_ID',
};

export const setProfile = (payload) => ({type: profileActionTypes.SET_PROFILE, payload});
export const setProfileId = (payload) => ({type: profileActionTypes.SET_PROFILE_ID, payload});

export const setProfileAsync = () => async dispatch => {
    const {data: response} = await apiServer.get('profile');

    response.avatar = response.avatar ? response.avatar : '/defaultAvatar.png';
    dispatch(setProfile(response));
};

export const changeProfileAsync = (updatedProfile) => async dispatch => {
    const {data: response} = await apiClient.post('profile', updatedProfile, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    response.avatar = response.avatar ? response.avatar : '/defaultAvatar.png';
    dispatch(setProfile(response));
};

export const loginUserAsync = async (user, router) => {
    const {data: {token: response}} = await apiClient.post('login', user);

    Cookies.set('token', response);
    router.push('/');
};

export const registerUserAsync = async (user, router) => {
    const {data: {token: response}} = await apiClient.post('register', user);

    Cookies.set('token', response);
    router.push('/');
};

export const logoutUserAsync = (router) => async dispatch => {
    await apiClient.get('logout');
    await router.push('/login');
    Cookies.remove('token');
    dispatch(setProfile({}));
};
