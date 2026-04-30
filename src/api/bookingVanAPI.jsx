import axiosInstance from '../services/axios.instance';

export const bookingVan = (data) => {
    return axiosInstance.post('/booking', data);
};

export const getBookingHistory =(id, limit)=> {
    return axiosInstance.get(`/get-history/${id}`, {
        params: { limit },
    });
}
