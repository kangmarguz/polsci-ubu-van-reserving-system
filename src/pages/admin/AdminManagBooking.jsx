import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { motion } from 'motion/react';
import {
    Check,
    Eye,
    LoaderCircle,
    MoveRight,
    RefreshCcw,
    Search,
    X,
} from 'lucide-react';
import { toast } from 'react-toastify';

import { getAllBookings, updateBookingStatus } from '../../api/bookingVanAPI';
import ButtonGoBackHome from '../../components/utils/ButtonGoBackHome';

const statusStyles = {
    APPROVED: 'bg-green-100 text-green-700',
    COMPLETED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    CANCELLED: 'bg-red-100 text-red-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
};

const normalizeBookings = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.result)) return data.result;
    if (Array.isArray(data?.bookings)) return data.bookings;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

const getRequester = (booking) =>
    booking?.title ||
    booking?.user?.name ||
    booking?.userName ||
    booking?.requester ||
    'Unknown requester';

const getDescription = (booking) =>
    booking?.description || booking?.detail || 'No description provided.';

const getStartDate = (booking) => booking?.startDate || booking?.start;

const getEndDate = (booking) => booking?.endDate || booking?.end;

const getPeople = (booking) =>
    booking?.people || booking?.taskImages || booking?.passengers || [];

const formatDate = (date) => {
    if (!date || !dayjs(date).isValid()) return '-';
    return dayjs(date).format('DD MMM YYYY');
};

const AdminManagBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [processingStatus, setProcessingStatus] = useState(null);
    const [searchText, setSearchText] = useState('');

    const fetchBookings = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllBookings();
            setBookings(normalizeBookings(res.data));
        } catch (error) {
            console.error('Fetch bookings failed:', error);
            toast('Cannot load booking list', { type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    const filteredBookings = useMemo(() => {
        const keyword = searchText.trim().toLowerCase();
        if (!keyword) return bookings;

        return bookings.filter((booking) => {
            const searchable = [
                booking?.id,
                getRequester(booking),
                getDescription(booking),
                booking?.status,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return searchable.includes(keyword);
        });
    }, [bookings, searchText]);

    useEffect(() => {
        Promise.resolve().then(fetchBookings);
    }, [fetchBookings]);

    const handleProcessBooking = async (status) => {
        if (!selectedBooking) return;

        setProcessingStatus(status);
        try {
            const res = await updateBookingStatus(selectedBooking.id, status);
            const updatedBooking = res.data?.result || res.data?.booking || {
                ...selectedBooking,
                status,
            };

            setBookings((prev) =>
                prev.map((booking) =>
                    booking.id === selectedBooking.id
                        ? { ...booking, ...updatedBooking, status }
                        : booking,
                ),
            );
            setSelectedBooking((prev) => ({ ...prev, ...updatedBooking, status }));
            toast(`Booking ${status.toLowerCase()} successfully`, {
                type: 'success',
            });
        } catch (error) {
            console.error('Update booking failed:', error);
            toast('Cannot update booking status', { type: 'error' });
        } finally {
            setProcessingStatus(null);
        }
    };

    return (
        <div className="w-4/5 mx-auto my-4 border border-gray-100 rounded-2xl shadow-sm">
            <ButtonGoBackHome redirectPath="/admin" />
            <motion.div
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-4">
                    <div>
                        <h1 className="text-blue-600 text-3xl font-bold">
                            Manage Booking
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Review van reservation requests and process approval.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search booking"
                                className="w-full sm:w-64 pl-10 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={fetchBookings}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            <RefreshCcw
                                size={16}
                                className={isLoading ? 'animate-spin' : ''}
                            />
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto overflow-y-auto max-h-[62vh] border border-gray-200 rounded-xl">
                    <table className="w-full min-w-[760px] table-fixed border-collapse">
                        <thead className="sticky top-0 z-10 bg-gray-100 shadow-sm">
                            <tr className="text-gray-700 text-left text-sm uppercase tracking-wider">
                                <th className="px-6 py-3 w-1/12 bg-gray-100">
                                    No.
                                </th>
                                <th className="px-6 py-3 w-5/12 bg-gray-100">
                                    Request
                                </th>
                                <th className="px-6 py-3 w-3/12 bg-gray-100">
                                    Date
                                </th>
                                <th className="px-6 py-3 w-2/12 text-center bg-gray-100">
                                    Status
                                </th>
                                <th className="px-6 py-3 w-1/12 text-center bg-gray-100">
                                    Detail
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {isLoading && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-10 text-center text-gray-500"
                                    >
                                        <div className="inline-flex items-center gap-2">
                                            <LoaderCircle
                                                size={20}
                                                className="animate-spin"
                                            />
                                            Loading bookings...
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {!isLoading && filteredBookings.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-10 text-center text-gray-500"
                                    >
                                        No booking request found.
                                    </td>
                                </tr>
                            )}

                            {!isLoading &&
                                filteredBookings.map((booking, index) => (
                                    <tr
                                        key={booking.id || index}
                                        className="hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
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
                                            {formatDate(getStartDate(booking))}{' '}
                                            - {formatDate(getEndDate(booking))}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    statusStyles[
                                                        booking.status
                                                    ] ||
                                                    'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                {booking.status || 'UNKNOWN'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedBooking(booking)
                                                }
                                                className="inline-flex p-2 rounded-lg text-blue-600 cursor-pointer hover:bg-blue-100"
                                                aria-label="View booking detail"
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {selectedBooking && (
                <BookingDetailModal
                    booking={selectedBooking}
                    processingStatus={processingStatus}
                    onClose={() => setSelectedBooking(null)}
                    onProcess={handleProcessBooking}
                />
            )}
        </div>
    );
};

const BookingDetailModal = ({
    booking,
    processingStatus,
    onClose,
    onProcess,
}) => {
    const people = getPeople(booking);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="flex flex-col max-w-2xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="shrink-0 px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Booking Details
                        </h2>
                        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                            Review and process request
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full cursor-pointer hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <InfoBox label="Reference ID" value={`#${booking.id || '-'}`} />
                        <InfoBox
                            label="Requester"
                            value={getRequester(booking)}
                        />
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                Status
                            </p>
                            <span
                                className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                    statusStyles[booking.status] ||
                                    'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {booking.status || 'UNKNOWN'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-white">
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                                Start Date
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                                {formatDate(getStartDate(booking))}
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                            <MoveRight />
                        </div>
                        <div className="flex-1 text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                                End Date
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                                {formatDate(getEndDate(booking))}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase mb-2 block">
                            Description
                        </label>
                        <div className="bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                                {getDescription(booking)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase mb-3 block">
                            People
                        </label>
                        <div className="space-y-2">
                            {people.length === 0 && (
                                <div className="p-3 rounded-xl border border-gray-100 text-sm text-gray-500">
                                    No people added.
                                </div>
                            )}
                            {people.map((person, index) => (
                                <div
                                    key={person.id || index}
                                    className="flex flex-col gap-1 p-3 rounded-xl border border-gray-100 bg-white sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            {person.name ||
                                                person.url ||
                                                `Person ${index + 1}`}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {person.role ||
                                                person.description ||
                                                'No role'}
                                        </p>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">
                                        Ref: {person.refID || person.id || '-'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={!!processingStatus}
                        className="px-5 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition-all disabled:opacity-50"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={() => onProcess('REJECTED')}
                        disabled={!!processingStatus}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-red-600 text-sm font-bold text-white cursor-pointer hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed"
                    >
                        {processingStatus === 'REJECTED' ? (
                            <LoaderCircle size={16} className="animate-spin" />
                        ) : (
                            <X size={16} />
                        )}
                        Reject
                    </button>
                    <button
                        type="button"
                        onClick={() => onProcess('APPROVED')}
                        disabled={!!processingStatus}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-green-600 text-sm font-bold text-white cursor-pointer hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
                    >
                        {processingStatus === 'APPROVED' ? (
                            <LoaderCircle size={16} className="animate-spin" />
                        ) : (
                            <Check size={16} />
                        )}
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoBox = ({ label, value }) => (
    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {label}
        </p>
        <p className="text-sm text-gray-800 font-medium truncate">{value}</p>
    </div>
);

export default AdminManagBooking;
