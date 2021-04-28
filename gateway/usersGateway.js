import Api from '../utils/Api';

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
        const response = await Api.get('profile');

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
        const response = await Api.get(`users/${email}`);

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const getUsers = async () => {
    try {
        const response = await Api.get('users');

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}