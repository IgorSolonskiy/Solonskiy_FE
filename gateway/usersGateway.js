import apiClient from '../utils/apiClient';
import apiServer from "../utils/apiServer";

export const loginUser = async (user) => {
    try {
        const {data: {token: response}} = await apiClient.post('login', user);
        return response

    } catch (error) {
        throw new Error('Internal Server Error');
    }
}

export const confirmUser = async () => {
    try {
        const {data: response} = await apiServer.get('profile');

        return response;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const registerUser = async (user) => {
    try {
        const {data: {token: response}} = await apiClient.post('register', user);

        return response;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const logoutUser = async () => {
    try {
        const {data: response} = await apiClient.get('logout');

        return response;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const userInformation = async (email) => {
    try {
        const {data: response} = await apiServer.get(`users/${email}`);

        return response;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}
