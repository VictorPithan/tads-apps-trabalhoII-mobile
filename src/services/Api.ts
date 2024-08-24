import axios from "axios";
import { AppError } from '@shared/AppError';

const api = axios.create({
    baseURL: "http://your-ipv4-address:3000/api",
    timeout: 5000
});

api.interceptors.response.use(response => response, errors => {
    if (errors.response && errors.response.data) {
        return Promise.reject(new AppError(errors.response.data.message))
    }
    return Promise.reject(new AppError("Erro no servidor, tente novamente mais tarde"));
});

export { api }