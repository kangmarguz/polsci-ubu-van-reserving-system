import dayjs from 'dayjs';

import { updateBookingStatus } from '../api/bookingVanAPI';

const COMPLETABLE_STATUSES = new Set(['APPROVED', 'IN_PROGRESS']);

const getBookingEndDate = (booking) => booking?.endDate || booking?.end;

export const shouldCompleteBooking = (booking) => {
    const endDate = dayjs(getBookingEndDate(booking));

    if (!endDate.isValid()) return false;
    if (!COMPLETABLE_STATUSES.has(booking?.status)) return false;

    return endDate.isBefore(dayjs().startOf('day'), 'day');
};

export const syncCompletedBookings = async (bookings = []) => {
    const list = Array.isArray(bookings) ? bookings : [];

    const syncedBookings = await Promise.all(
        list.map(async (booking) => {
            if (!booking?.id || !shouldCompleteBooking(booking)) {
                return booking;
            }

            try {
                const res = await updateBookingStatus(booking.id, 'COMPLETED');
                const updatedBooking = res.data?.result || res.data?.booking || {};

                return {
                    ...booking,
                    ...updatedBooking,
                    status: 'COMPLETED',
                };
            } catch (error) {
                console.error('Auto-complete booking failed:', error);
                return booking;
            }
        }),
    );

    return syncedBookings;
};
