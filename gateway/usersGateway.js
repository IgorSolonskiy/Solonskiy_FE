import Api from '../utils/Api';
import serverApi from "../utils/serverApi";

export const loginUser = async (user) => {
    try {
        const response = await Api.post('login', user);
        return response.data.token;

    } catch (error) {
        throw new Error('Internal Server Error');
    }
}

export const confirmUser = async () => {
    try {
        const response = await serverApi.get('profile');

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const registerUser = async (user) => {
    try {
        const response = await Api.post('register', user);

        return response.data.token;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const logoutUser = async () => {
    try {
        const response = await Api.get('logout');

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const userInformation = async (email) => {
    try {
        const response = await serverApi.get(`users/${email}`);

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}
