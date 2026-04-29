import axiosInstance from '../services/axios.instance';

export const bookingVan = (data) => {
    return axiosInstance.post('/booking', data);
};
