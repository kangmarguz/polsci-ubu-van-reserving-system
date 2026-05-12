import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';

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

const AdminManagBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [processingStatus, setProcessingStatus] = useState(null);
    const [searchText, setSearchText] = useState('');

    const fetchBookings = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllBookings();
            setBookings(res.data.result);
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

                <AdminBookingTable
                    bookings={filteredBookings}
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

export default AdminManagBooking;
