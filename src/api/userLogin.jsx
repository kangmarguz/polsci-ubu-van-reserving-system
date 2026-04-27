import axios from 'axios';
import axiosInstance from '../services/axios.instance';

export const loginUser = async (data) => {
    return await axiosInstance.post('/login', data);
};

export const registerUser = async(data)=> {
    return await axiosInstance.post('/register',data);
}
