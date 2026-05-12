import { Check, LoaderCircle, MoveRight, X } from 'lucide-react';

import {
    formatDate,
    getDescription,
    getEndDate,
    getPeople,
    getRequester,
    getStartDate,
    statusStyles,
} from './bookingUtils';

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
                <ModalHeader onClose={onClose} />

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <BookingSummary booking={booking} />
                    <BookingDateRange booking={booking} />
                    <BookingDescription booking={booking} />
                    <PeopleList people={people} />
                </div>

                <ModalActions
                    processingStatus={processingStatus}
                    onClose={onClose}
                    onProcess={onProcess}
                />
            </div>
        </div>
    );
};

const ModalHeader = ({ onClose }) => (
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
);

const BookingSummary = ({ booking }) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <InfoBox label="Reference ID" value={`#${booking.id || '-'}`} />
        <InfoBox label="Requester" value={getRequester(booking)} />
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Status
            </p>
            <span
                className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    statusStyles[booking.status] || 'bg-gray-200 text-gray-700'
                }`}
            >
                {booking.status || 'UNKNOWN'}
            </span>
        </div>
    </div>
);

const BookingDateRange = ({ booking }) => (
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
);

const BookingDescription = ({ booking }) => (
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
);

const PeopleList = ({ people }) => (
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
                <PersonRow key={person.id || index} person={person} index={index} />
            ))}
        </div>
    </div>
);

const PersonRow = ({ person, index }) => (
    <div className="flex flex-col gap-1 p-3 rounded-xl border border-gray-100 bg-white sm:flex-row sm:items-center sm:justify-between">
        <div>
            <p className="text-sm font-bold text-gray-800">
                {person.name || person.url || `Person ${index + 1}`}
            </p>
            <p className="text-xs text-gray-400">
                {person.role || person.description || 'No role'}
            </p>
        </div>
        <span className="text-xs font-mono text-gray-400">
            Ref: {person.refID || person.id || '-'}
        </span>
    </div>
);

const ModalActions = ({ processingStatus, onClose, onProcess }) => (
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
);

const InfoBox = ({ label, value }) => (
    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {label}
        </p>
        <p className="text-sm text-gray-800 font-medium truncate">{value}</p>
    </div>
);

export default BookingDetailModal;
