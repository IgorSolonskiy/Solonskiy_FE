import apiServer from "../../libs/apiServer";
import apiClient from "../../libs/apiClient";
import Cookies from 'js-cookie';

export const profileActionTypes = {
    SET_PROFILE: 'PROFILE.SET_PROFILE'
};

export const setProfile = (payload) => ({type: profileActionTypes.SET_PROFILE, payload});

export const setProfileAsync = () => async dispatch => {
    const {data: response} = await apiServer.get('profile');
    
    dispatch(setProfile(response));
};

export const changeProfileAsync = (updatedProfile) => async dispatch => {
    const {data: response} = await apiClient.post('profile', updatedProfile, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    dispatch(setProfile(response));
};

export const loginUserAsync = user => async dispatch =>  {
    const {data: {token: response}} = await apiClient.post('login', user);

    await Cookies.set('token', response);
};

export const registerUserAsync = (user) => async dispatch => {
    const {data: {token: response}} = await apiClient.post('register', user);

    await Cookies.set('token', response);
};

export const logoutUserAsync = () => async dispatch => {
    await apiClient.get('logout');
    await Cookies.remove('token');
    dispatch(setProfile({}));
};
