import api from "../services/AxiosConfig"

export const loginUser = async (data)=> {
    const result = await api.post('/login', data);
    return result.data;
}