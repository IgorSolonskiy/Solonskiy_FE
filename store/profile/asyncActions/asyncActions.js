import apiServer from "../../../libs/apiServer";
import {profileActions} from "../actions";

export const addProfileThunkCreator = () => async dispatch => {
    const {data: response} = await apiServer.get('profile');

    dispatch(profileActions.addProfile(response));
};