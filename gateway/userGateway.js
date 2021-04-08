import Api from '../utils/Api';
import configApi from "../common/configApi";
import axios from "axios";

export const loginUser = async (user) => {
    try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie',{withCredentials: true});
        const response = await Api.post('login',user);
        return response.data.token;

    } catch (error) {
        throw new Error('Internal Server Error');
    }
}

export const confirmUser = async (token = '') => {
    try {
        const response = await Api.get('profile',configApi(token));

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const registerUser = async (user) => {
    try {
        const response = await Api.post('register',user);

        return response.data.token;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const logoutUser = async () => {
    try {
        const response = await Api.post('logout',{},configApi());

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}

export const userInformation = async (email,token = '') => {
    try {
        const response = await Api.get(`users/${email}`,configApi(token));

        return response.data;
    } catch (error) {

        throw new Error('Internal Server Error');

    }
}