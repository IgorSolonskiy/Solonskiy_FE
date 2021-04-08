import axios from 'axios';


export default axios.create({
    baseURL: process.env.API_URL,
    responseType: "json",
    withCredentials: true,
});
