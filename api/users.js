import apiClient from '../libs/apiClient';

export const loginUser = async (user) => {
        const {data: {token: response}} = await apiClient.post('login', user);

        return response
}

export const registerUser = async (user) => {
        const {data: {token: response}} = await apiClient.post('register', user);

        return response;
}

export const logoutUser = async () => {
        const {data: response} = await apiClient.get('logout');

        return response;
}
