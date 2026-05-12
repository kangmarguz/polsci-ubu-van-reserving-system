import axiosInstance from '../services/axios.instance';

export const getAllUsers = () => {
    return axiosInstance.get('/users');
};

export const updateUserRole = (id, role) => {
    return axiosInstance.patch(`/users/${id}/role`, { role });
};

export const updateUserActive = (id, isActive) => {
    return axiosInstance.patch(`/users/${id}/active`, { isActive });
};
