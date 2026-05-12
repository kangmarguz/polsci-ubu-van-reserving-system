import {
    getRequester,
    statusStyles,
} from '../admin/booking/bookingUtils';

const MoreBookings = ({ bookings }) => (
    <div className="group relative inline-block">
        <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-emerald-700 underline-offset-2 hover:underline"
        >
            +{bookings.length - 2} more
        </button>
        <div className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-64 rounded-lg border border-gray-200 bg-white p-3 text-left shadow-xl group-hover:block">
            <p className="mb-2 text-xs font-bold uppercase text-gray-500">
                All reservations
            </p>
            <div className="max-h-64 space-y-2 overflow-y-auto">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="rounded-md border border-gray-100 bg-gray-50 px-2 py-2"
                    >
                        <p className="truncate text-xs font-semibold text-gray-800">
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
            </div>
        </div>
    </div>
);

export default MoreBookings;
