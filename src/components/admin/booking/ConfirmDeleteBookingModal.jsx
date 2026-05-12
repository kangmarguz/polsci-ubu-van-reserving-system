import { LoaderCircle, OctagonAlert, X } from 'lucide-react';

import { getRequester } from './bookingUtils';

const ConfirmDeleteBookingModal = ({
    booking,
    isDeleting,
    onCancel,
    onConfirm,
}) => (
    <div
        className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4"
        onClick={onCancel}
    >
        <div
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Delete Booking?
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        This action is permanent and cannot be undone.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isDeleting}
                    className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Close delete confirmation modal"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="px-6 py-5">
                <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600">
                        <OctagonAlert size={40} />
                    </div>
                </div>
                <p className="text-center text-sm leading-relaxed text-gray-600">
                    You are about to delete booking{' '}
                    <span className="rounded bg-gray-100 px-1 font-mono font-bold text-gray-800">
                        #{booking.id || '-'}
                    </span>
                    {' '}from{' '}
                    <span className="font-bold text-gray-800">
                        {getRequester(booking)}
                    </span>
                    .
                </p>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isDeleting}
                    className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    No, Keep It
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isDeleting}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
                >
                    {isDeleting && <LoaderCircle size={16} className="animate-spin" />}
                    Yes, Delete Booking
                </button>
            </div>
        </div>
    </div>
);

export default ConfirmDeleteBookingModal;
