import dayjs from 'dayjs';

export const statusStyles = {
    APPROVED: 'bg-green-100 text-green-700',
    COMPLETED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    CANCELLED: 'bg-red-100 text-red-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
};

export const getRequester = (booking) =>
    booking?.title ||
    booking?.user?.name ||
    booking?.userName ||
    booking?.requester ||
    'Unknown requester';

export const getDescription = (booking) =>
    booking?.description || booking?.detail || 'No description provided.';

export const getStartDate = (booking) => booking?.startDate || booking?.start;

export const getEndDate = (booking) => booking?.endDate || booking?.end;

export const getPeople = (booking) =>
    booking?.people || booking?.taskImages || booking?.passengers || [];

export const formatDate = (date) => {
    if (!date || !dayjs(date).isValid()) return '-';
    return dayjs(date).format('DD MMM YYYY');
};
