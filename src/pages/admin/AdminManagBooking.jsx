import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import { CheckCircle2, Clock3, LoaderCircle, XCircle } from 'lucide-react';

import {
    deleteBooking,
    getAllBookings,
    updateBookingStatus,
} from '../../api/bookingVanAPI';
import AdminBookingHeader from '../../components/admin/booking/AdminBookingHeader';
import AdminBookingTable from '../../components/admin/booking/AdminBookingTable';
import BookingDetailModal from '../../components/admin/booking/BookingDetailModal';
import ConfirmDeleteBookingModal from '../../components/admin/booking/ConfirmDeleteBookingModal';
import {
    getDescription,
    getRequester,
} from '../../components/admin/booking/bookingUtils';
import ButtonGoBackHome from '../../components/utils/ButtonGoBackHome';
import { syncCompletedBookings } from '../../utils/bookingStatusSync';

const STATUS_TABLES = [
    {
        key: 'PENDING',
        label: 'Pending',
        statuses: ['PENDING'],
        icon: Clock3,
        className: 'border-yellow-200 bg-yellow-50 text-yellow-700',
    },
    {
        key: 'IN_PROGRESS',
        label: 'In Progress',
        statuses: ['IN_PROGRESS', 'APPROVED'],
        icon: LoaderCircle,
        className: 'border-blue-200 bg-blue-50 text-blue-700',
    },
    {
        key: 'COMPLETE',
        label: 'Complete',
        statuses: ['COMPLETE', 'COMPLETED'],
        icon: CheckCircle2,
        className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    },
    {
        key: 'CANCEL',
        label: 'Cancel',
        statuses: ['CANCEL', 'CANCELLED', 'REJECTED'],
        icon: XCircle,
        className: 'border-red-200 bg-red-50 text-red-700',
    },
];

const AdminManagBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [processingStatus, setProcessingStatus] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [activeStatusTable, setActiveStatusTable] = useState('PENDING');

    const fetchBookings = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllBookings();
            const syncedBookings = await syncCompletedBookings(res.data?.result);
            setBookings(syncedBookings);
        } catch (error) {
            console.error('Fetch bookings failed:', error);
            toast('Cannot load booking list', { type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    const searchedBookings = useMemo(() => {
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

    const bookingsByStatusTable = useMemo(() => {
        return STATUS_TABLES.reduce((acc, table) => {
            acc[table.key] = searchedBookings.filter((booking) =>
                table.statuses.includes(booking?.status),
            );
            return acc;
        }, {});
    }, [searchedBookings]);

    const activeBookings = bookingsByStatusTable[activeStatusTable] || [];

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

    const handleRequestDeleteBooking = (booking) => {
        setBookingToDelete(booking);
    };

    const handleCancelDeleteBooking = () => {
        if (processingStatus) return;
        setBookingToDelete(null);
    };

    const handleDeleteBooking = async () => {
        if (!bookingToDelete) return;

        setProcessingStatus('DELETE');
        try {
            await deleteBooking(bookingToDelete.id);
            setBookings((prev) =>
                prev.filter((booking) => booking.id !== bookingToDelete.id),
            );
            setSelectedBooking((prev) =>
                prev?.id === bookingToDelete.id ? null : prev,
            );
            setBookingToDelete(null);
            toast('Booking deleted successfully', { type: 'success' });
        } catch (error) {
            console.error('Delete booking failed:', error);
            toast('Cannot delete booking', { type: 'error' });
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
                <AdminBookingHeader
                    isLoading={isLoading}
                    searchText={searchText}
                    onRefresh={fetchBookings}
                    onSearchChange={setSearchText}
                />

                <StatusTableTabs
                    activeStatusTable={activeStatusTable}
                    bookingsByStatusTable={bookingsByStatusTable}
                    onStatusTableChange={setActiveStatusTable}
                />

                <AdminBookingTable
                    bookings={activeBookings}
                    isLoading={isLoading}
                    onSelectBooking={setSelectedBooking}
                    onDeleteBooking={handleRequestDeleteBooking}
                />
            </motion.div>

            {selectedBooking && (
                <BookingDetailModal
                    booking={selectedBooking}
                    processingStatus={processingStatus}
                    onClose={() => setSelectedBooking(null)}
                    onProcess={handleProcessBooking}
                    onDeleteRequest={() => handleRequestDeleteBooking(selectedBooking)}
                />
            )}

            {bookingToDelete && (
                <ConfirmDeleteBookingModal
                    booking={bookingToDelete}
                    isDeleting={processingStatus === 'DELETE'}
                    onCancel={handleCancelDeleteBooking}
                    onConfirm={handleDeleteBooking}
                />
            )}
        </div>
    );
};

const StatusTableTabs = ({
    activeStatusTable,
    bookingsByStatusTable,
    onStatusTableChange,
}) => (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {STATUS_TABLES.map((table) => {
            const Icon = table.icon;
            const count = bookingsByStatusTable[table.key]?.length || 0;
            const isActive = activeStatusTable === table.key;

            return (
                <button
                    key={table.key}
                    type="button"
                    onClick={() => onStatusTableChange(table.key)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                        isActive
                            ? table.className
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <span className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-white/80">
                            <Icon size={20} />
                        </span>
                        <span>
                            <span className="block text-sm font-bold">
                                {table.label}
                            </span>
                            <span className="text-xs opacity-75">
                                {table.key} table
                            </span>
                        </span>
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-bold shadow-sm">
                        {count}
                    </span>
                </button>
            );
        })}
    </div>
);

export default AdminManagBooking;
