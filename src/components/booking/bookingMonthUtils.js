import dayjs from 'dayjs';

import {
    getEndDate,
    getStartDate,
} from '../admin/booking/bookingUtils';

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const visibleStatuses = new Set([
    'PENDING',
    'APPROVED',
    'IN_PROGRESS',
    'COMPLETED',
]);

export const buildMonthDays = (month) => {
    const start = month.startOf('month').startOf('week');
    const end = month.endOf('month').endOf('week');
    const days = [];
    let cursor = start;

    while (cursor.isSame(end, 'day') || cursor.isBefore(end, 'day')) {
        days.push({ date: cursor });
        cursor = cursor.add(1, 'day');
    }

    return days;
};

export const chunkWeeks = (days) => {
    const weeks = [];
    for (let index = 0; index < days.length; index += 7) {
        weeks.push(days.slice(index, index + 7));
    }
    return weeks;
};

export const groupBookingsByDate = (bookings, selectedMonth) => {
    const map = new Map();
    const monthStart = selectedMonth.startOf('month');
    const monthEnd = selectedMonth.endOf('month');

    bookings
        .filter((booking) => visibleStatuses.has(booking?.status))
        .forEach((booking) => {
            const start = dayjs(getStartDate(booking));
            const end = dayjs(getEndDate(booking) || getStartDate(booking));

            if (!start.isValid() || !end.isValid()) return;
            if (end.isBefore(monthStart, 'day') || start.isAfter(monthEnd, 'day')) {
                return;
            }

            let cursor = start.isBefore(monthStart, 'day') ? monthStart : start;
            const rangeEnd = end.isAfter(monthEnd, 'day') ? monthEnd : end;

            while (cursor.isSame(rangeEnd, 'day') || cursor.isBefore(rangeEnd, 'day')) {
                const key = cursor.format('YYYY-MM-DD');
                const dayBookings = map.get(key) || [];
                dayBookings.push(booking);
                map.set(key, dayBookings);
                cursor = cursor.add(1, 'day');
            }
        });

    return map;
};
