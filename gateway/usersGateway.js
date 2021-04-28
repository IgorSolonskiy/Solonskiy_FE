import {Api} from "../utils/Api";

export const loginUser = async (user) => {
    try {
        const response = await Api.instance.post('login', user);
        return response.data.token;

    } catch (error) {
        throw new Error('Internal Server Error');
    }
}

export const confirmUser = async () => {
    try {
        const response = await Api.instance.get('profile');

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const registerUser = async (user) => {
    try {
        const response = await Api.instance.post('register', user);

        return response.data.token;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const logoutUser = async () => {
    try {
        const response = await Api.instance.get('logout');

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const userInformation = async (email) => {
    try {
        const response = await Api.instance.get(`users/${email}`);

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}
