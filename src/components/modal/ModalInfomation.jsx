import dayjs from 'dayjs';
import React from 'react';

const ModalInfomation = ({ modalState, closeModal }) => {
    const statusStyles = {
        COMPLETED: 'bg-green-100 text-green-700',
        PENDING: 'bg-yellow-100 text-yellow-700',
        IN_PROGRESS: 'bg-blue-100 text-blue-700',
    };

    console.log(modalState.item);

    const { taskImages } = modalState.item;

    return (
        <div className="flex flex-col max-w-lg w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Sticky Header: flex-shrink-0 ensures it doesn't squash */}
            <div className="shrink-0 px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Booking Details
                    </h2>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                        Request Information
                    </p>
                </div>
                <button
                    onClick={closeModal}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <span className="text-xl leading-none">✕</span>
                </button>
            </div>

            {/* Scrollable Body: flex-1 allows it to take up available space */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
                {/* Info Cards Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Reference ID
                        </p>
                        <p className="font-mono text-sm text-indigo-600 font-medium">
                            #{modalState.item.id}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Status
                        </p>
                        <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusStyles[modalState.item.status] || 'bg-gray-200 text-gray-700'}`}
                        >
                            {modalState.item.status}
                        </span>
                    </div>
                </div>

                {/* Date Range Row */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-white">
                    <div className="flex-1">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                            Start Date
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                            {dayjs(modalState.item.startDate).format(
                                'DD MMM YYYY',
                            )}
                        </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                        <span className="text-gray-300">→</span>
                    </div>
                    <div className="flex-1 text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                            End Date
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                            {dayjs(modalState.item.endDate).format(
                                'DD MMM YYYY',
                            )}
                        </p>
                    </div>
                </div>

                {/* Requester & Description */}
                <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-50">
                        <label className="text-[11px] font-bold text-gray-400 uppercase mb-1 block">
                            Requester
                        </label>
                        <p className="text-gray-800 font-medium">
                            {modalState.item.title}
                        </p>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase mb-2 block">
                            Description
                        </label>
                        <div className="bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {modalState.item.description ||
                                    'No description provided.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Follower List Section */}
                <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase mb-3 block">
                        Followers Assigned
                    </label>
                    <div className="space-y-2">
                        {taskImages.map((people) => (
                            <div
                                key={people.id}
                                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-xs font-bold text-gray-800">
                                            {people.url}
                                        </p>
                                        <p className="text-[10px] text-gray-400 font-mono tracking-tight">
                                            ID: {people.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Footer: Fixed at the bottom */}
            <div className="shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                <button
                    onClick={closeModal}
                    className="px-8 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all shadow-sm active:scale-95"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalInfomation;
