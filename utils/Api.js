import axios from 'axios';

class AxiosController {
    constructor(baseURL) {
        this.instance = axios.create(
            baseURL
        );
        this.init();
    }

    setToken(token) {
        this.token = token;
    }

    init() {
        this.instance.interceptors.request.use( config=> {
            if (this.token) {
                config.headers.Authorization = `Bearer ${this.token}`;
            }
            return config;
        });
    }
}

export const Api = new AxiosController({baseURL: process.env.API_URL})
