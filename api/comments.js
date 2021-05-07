import apiServer from "../libs/apiServer";

export const getComments = async (id = '') => {
    const {data: response} = await apiServer.get(`posts/${id}/comments`);

    return response;
}