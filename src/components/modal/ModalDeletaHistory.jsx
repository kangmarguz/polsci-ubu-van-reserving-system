import React, { useState } from 'react';
import { delBookingHistory } from '../../api/bookingVanAPI';
import { OctagonAlert } from 'lucide-react';
const ModalDeletaHistory = ({ modalState, closeModal }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await delBookingHistory(id);
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="p-2">
            {/* Warning Icon & Header */}
            <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100">
                    <OctagonAlert color='red' size={48} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                    Delete Booking ?
                </h2>
                <p className="text-sm text-gray-500 mt-2 px-4 leading-relaxed">
                    You are about to delete booking{' '}
                    <span className="font-mono font-bold text-gray-700 bg-gray-100 px-1 rounded">
                        #{modalState.item.id}
                    </span>
                    . This action is permanent and cannot be undone.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <button
                    disabled={isDeleting}
                    onClick={closeModal}
                    className="flex-1 cursor-pointer px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                    No, Keep it
                </button>
                <button
                    disabled={isDeleting}
                    onClick={() => handleDelete(modalState.item.id)}
                    className={`flex-1 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-sm flex items-center justify-center gap-2
                    ${isDeleting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700 active:scale-95'}`}
                >
                    {isDeleting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Deleting...
                        </>
                    ) : (
                        'Yes, Delete Booking'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ModalDeletaHistory;
