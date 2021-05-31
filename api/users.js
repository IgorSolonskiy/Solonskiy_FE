import apiClient from "../libs/apiClient";

export const getSearchUsers = async (username, page = 1, limit = 6) => {
    const { data: response } = await apiClient
        .get(`users?username=${username}&limit=${limit}&page=${page}`);

    return response.data;
};