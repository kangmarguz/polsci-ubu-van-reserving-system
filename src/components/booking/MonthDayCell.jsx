import dayjs from 'dayjs';

import {
    getRequester,
    statusStyles,
} from '../admin/booking/bookingUtils';
import MoreBookings from './MoreBookings';

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
                {bookings.length > 2 && <MoreBookings bookings={bookings} />}
            </div>
        </td>
    );
};

export default MonthDayCell;
