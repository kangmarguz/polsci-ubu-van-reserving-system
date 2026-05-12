import axiosInstance from '../services/axios.instance';

export const bookingVan = (data) => {
    return axiosInstance.post('/booking', data);
};

export const getBookingHistory = (id, limit) => {
    return axiosInstance.get(`/history/${id}`, {
        params: { limit },
    });
};

export const delBookingHistory = (id) => {
    return axiosInstance.delete(`/history/${id}`);
};

export const getAllBookings = () => {
    return axiosInstance.get('/booking');
};

export const updateBookingStatus = (id, status) => {
    return axiosInstance.patch(`/booking/${id}`, { status });
};
