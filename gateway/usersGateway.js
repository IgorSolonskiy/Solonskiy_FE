import apiClient from '../utils/apiClient';
import apiServer from "../utils/apiServer";

export const loginUser = async (user) => {
    try {
        const response = await apiClient.post('login', user);
        return response.data.token;

    } catch (error) {
        throw new Error('Internal Server Error');
    }
}

export const confirmUser = async () => {
    try {
        const response = await apiServer.get('profile');

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const registerUser = async (user) => {
    try {
        const response = await apiClient.post('register', user);

        return response.data.token;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const logoutUser = async () => {
    try {
        const response = await apiClient.get('logout');

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const userInformation = async (email) => {
    try {
        const response = await apiServer.get(`users/${email}`);

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}
