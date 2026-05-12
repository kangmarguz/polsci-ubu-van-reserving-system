import { Eye, LoaderCircle, Trash2 } from 'lucide-react';

import {
    formatDate,
    getDescription,
    getEndDate,
    getRequester,
    getStartDate,
    statusStyles,
} from './bookingUtils';

const AdminBookingTable = ({
    bookings,
    isLoading,
    onSelectBooking,
    onDeleteBooking,
}) => (
    <div className="overflow-x-auto overflow-y-auto max-h-[62vh] border border-gray-200 rounded-xl">
        <table className="w-full min-w-190 table-fixed border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-100 shadow-sm">
                <tr className="text-gray-700 text-left text-sm uppercase tracking-wider">
                    <th className="px-6 py-3 w-1/12 bg-gray-100">No.</th>
                    <th className="px-6 py-3 w-4/12 bg-gray-100">
                        Request
                    </th>
                    <th className="px-6 py-3 w-3/12 bg-gray-100">Date</th>
                    <th className="px-6 py-3 w-2/12 text-center bg-gray-100">
                        Status
                    </th>
                    <th className="px-6 py-3 w-1/12 text-center bg-gray-100">
                        Detail
                    </th>
                    <th className="px-6 py-3 w-1/12 text-center bg-gray-100">
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading && <LoadingRow />}

                {!isLoading && bookings.length === 0 && <EmptyRow />}

                {!isLoading &&
                    bookings.map((booking, index) => (
                        <BookingTableRow
                            key={booking.id || index}
                            booking={booking}
                            index={index}
                            onSelectBooking={onSelectBooking}
                            onDeleteBooking={onDeleteBooking}
                        />
                    ))}
            </tbody>
        </table>
    </div>
);

const LoadingRow = () => (
    <tr>
        <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
            <div className="inline-flex items-center gap-2">
                <LoaderCircle size={20} className="animate-spin" />
                Loading bookings...
            </div>
        </td>
    </tr>
);

const EmptyRow = () => (
    <tr>
        <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
            No booking request found.
        </td>
    </tr>
);

const BookingTableRow = ({
    booking,
    index,
    onSelectBooking,
    onDeleteBooking,
}) => (
    <tr className="hover:bg-gray-50 transition duration-150">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">
            <div className="flex flex-col">
                <span className="font-medium text-gray-900 truncate">
                    <span className="font-bold text-blue-700">
                        Requester:{' '}
                    </span>
                    {getRequester(booking)}
                </span>
                <span className="text-sm text-gray-500 line-clamp-2">
                    {getDescription(booking)}
                </span>
                <span className="text-xs font-light text-gray-400">
                    Ref: {booking.id || '-'}
                </span>
            </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">
            {formatDate(getStartDate(booking))} -{' '}
            {formatDate(getEndDate(booking))}
        </td>
        <td className="px-6 py-4 text-center">
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusStyles[booking.status] || 'bg-gray-100 text-gray-600'
                }`}
            >
                {booking.status || 'UNKNOWN'}
            </span>
        </td>
        <td className="px-6 py-4 text-center">
            <button
                type="button"
                onClick={() => onSelectBooking(booking)}
                className="inline-flex p-2 rounded-lg text-blue-600 cursor-pointer hover:bg-blue-100"
                aria-label="View booking detail"
            >
                <Eye size={20} />
            </button>
        </td>
        <td className="px-6 py-4 text-center">
            <button
                type="button"
                onClick={() => onDeleteBooking(booking)}
                className="inline-flex p-2 rounded-lg text-red-600 cursor-pointer hover:bg-red-100"
                aria-label="Delete booking"
            >
                <Trash2 size={20} />
            </button>
        </td>
    </tr>
);

export default AdminBookingTable;
