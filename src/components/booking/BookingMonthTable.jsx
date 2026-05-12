import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { LoaderCircle } from 'lucide-react';

import { getAllBookings } from '../../api/bookingVanAPI';
import BookingMonthGrid from './BookingMonthGrid';
import BookingMonthHeader from './BookingMonthHeader';
import {
    buildMonthDays,
    groupBookingsByDate,
} from './bookingMonthUtils';
import { syncCompletedBookings } from '../../utils/bookingStatusSync';

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
            const syncedBookings = await syncCompletedBookings(res.data?.result);
            setBookings(syncedBookings);
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
    const bookingsByDate = useMemo(
        () => groupBookingsByDate(bookings, selectedMonth),
        [bookings, selectedMonth],
    );

    return (
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <BookingMonthHeader
                reservedDays={bookingsByDate.size}
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
                onRefresh={fetchBookings}
            />

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
                <BookingMonthGrid
                    monthDays={monthDays}
                    bookingsByDate={bookingsByDate}
                    selectedMonth={selectedMonth}
                />
            )}
        </section>
    );
};

export default BookingMonthTable;
