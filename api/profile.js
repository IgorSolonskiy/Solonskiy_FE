import apiServer from '../libs/apiServer';

export const getProfile = async () =>{
    const {data: response} = await apiServer.get('profile');

    return response;
}