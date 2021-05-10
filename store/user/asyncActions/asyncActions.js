import apiServer from "../../../libs/apiServer";
import {userActions} from "../actions";

export const addUserThunkCreator = username => async dispatch => {
    const {data: response} = await apiServer.get(`users/${username}`);

    dispatch(userActions.addUser(response));
};