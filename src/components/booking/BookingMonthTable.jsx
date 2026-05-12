import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    LoaderCircle,
    RefreshCw,
} from 'lucide-react';

import { getAllBookings } from '../../api/bookingVanAPI';
import {
    getEndDate,
    getRequester,
    getStartDate,
    statusStyles,
} from '../admin/booking/bookingUtils';

const visibleStatuses = new Set(['PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED']);

const BookingMonthTable = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(() => dayjs().startOf('month'));

    const fetchBookings = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            const res = await getAllBookings();
            setBookings(res.data?.result || []);
        } catch (err) {
            console.error('Fetch booking month failed:', err);
            setError('Cannot load reservation calendar.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        Promise.resolve().then(fetchBookings);
    }, [fetchBookings]);

    const monthDays = useMemo(() => buildMonthDays(selectedMonth), [selectedMonth]);

    const bookingsByDate = useMemo(() => {
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
    }, [bookings, selectedMonth]);

    const reservedDays = bookingsByDate.size;

    return (
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <CalendarDays size={24} />
                    </span>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Van Reservation Calendar
                        </h2>
                        <p className="text-sm text-gray-500">
                            {reservedDays} reserved day{reservedDays === 1 ? '' : 's'} in{' '}
                            {selectedMonth.format('MMMM YYYY')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setSelectedMonth((prev) => prev.subtract(1, 'month'))}
                        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                        aria-label="Previous month"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedMonth(dayjs().startOf('month'))}
                        className="inline-flex h-10 cursor-pointer items-center rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedMonth((prev) => prev.add(1, 'month'))}
                        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                        aria-label="Next month"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={fetchBookings}
                        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-emerald-100 text-emerald-700 transition hover:bg-emerald-50"
                        aria-label="Refresh calendar"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className="flex min-h-64 items-center justify-center gap-2 text-gray-500">
                    <LoaderCircle size={20} className="animate-spin" />
                    Loading reservation calendar...
                </div>
            )}

            {!isLoading && error && (
                <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
                    {error}
                </div>
            )}

            {!isLoading && !error && (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-180 table-fixed border-collapse">
                        <thead>
                            <tr>
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <th
                                        key={day}
                                        className="border border-gray-200 bg-gray-50 px-2 py-3 text-center text-xs font-bold uppercase text-gray-500"
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {chunkWeeks(monthDays).map((week, weekIndex) => (
                                <tr key={weekIndex}>
                                    {week.map((day) => (
                                        <MonthDayCell
                                            key={day.date.format('YYYY-MM-DD')}
                                            day={day}
                                            bookings={bookingsByDate.get(day.date.format('YYYY-MM-DD')) || []}
                                            selectedMonth={selectedMonth}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

const MonthDayCell = ({ day, bookings, selectedMonth }) => {
    const isCurrentMonth = day.date.isSame(selectedMonth, 'month');
    const isToday = day.date.isSame(dayjs(), 'day');
    const hasBooking = bookings.length > 0;

    return (
        <td
            className={`h-32 align-top border border-gray-200 p-2 ${
                isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-300'
            } ${hasBooking ? 'bg-emerald-50/60' : ''}`}
        >
            <div className="mb-2 flex items-center justify-between">
                <span
                    className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-bold ${
                        isToday
                            ? 'bg-emerald-600 text-white'
                            : isCurrentMonth
                              ? 'text-gray-700'
                              : 'text-gray-300'
                    }`}
                >
                    {day.date.date()}
                </span>
                {hasBooking && (
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                        {bookings.length}
                    </span>
                )}
            </div>

            <div className="space-y-1">
                {bookings.slice(0, 2).map((booking) => (
                    <div
                        key={booking.id}
                        className="rounded-md border border-emerald-100 bg-white px-2 py-1 text-xs shadow-sm"
                    >
                        <p className="truncate font-semibold text-gray-800">
                            {getRequester(booking)}
                        </p>
                        <span
                            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                statusStyles[booking.status] || 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {booking.status}
                        </span>
                    </div>
                ))}
                {bookings.length > 2 && (
                    <p className="text-xs font-semibold text-emerald-700">
                        +{bookings.length - 2} more
                    </p>
                )}
            </div>
        </td>
    );
};

const buildMonthDays = (month) => {
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

const chunkWeeks = (days) => {
    const weeks = [];
    for (let index = 0; index < days.length; index += 7) {
        weeks.push(days.slice(index, index + 7));
    }
    return weeks;
};

export default BookingMonthTable;
