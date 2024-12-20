import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `${token}`;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
   
    return error;
});

export default axiosClient; 
