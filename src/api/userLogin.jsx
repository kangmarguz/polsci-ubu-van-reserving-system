import axiosInstance from '../services/axios.instance';

export const loginUser = async (data) => {
    return axiosInstance.post('/login', data);
};

export const registerUser = async(data)=> {
    return axiosInstance.post('/register',data);
};

export const updateUserPassword = (id, data) => {
    return axiosInstance.patch(`/users/${id}/password`, data);
};
