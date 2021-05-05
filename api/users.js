import apiClient from '../libs/apiClient';
import apiServer from "../libs/apiServer";

export const loginUser = async (user) => {
        const {data: {token: response}} = await apiClient.post('login', user);

        return response
}

export const getProfile = async () => {
        const {data: response} = await apiServer.get('profile');

        return response;
}

export const registerUser = async (user) => {
        const {data: {token: response}} = await apiClient.post('register', user);

        return response;
}

export const logoutUser = async () => {
        const {data: response} = await apiClient.get('logout');

        return response;
}

export const getUserInformation = async (email) => {
        const {data: response} = await apiServer.get(`users/${email}`);

        return response;
}
