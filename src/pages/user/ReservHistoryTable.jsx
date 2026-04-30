import React, { useEffect, useState } from 'react';
import { SearchAlert, Bolt, Trash2 } from 'lucide-react';

import { getBookingHistory } from '../../api/bookingVanAPI';
import useClientStore from '../../store/client.store';
import ModalInfomation from '../../components/modal/ModalInfomation';
import ModalDeletaHistory from '../../components/modal/ModalDeletaHistory';

const ReservHistoryTable = () => {
    const user = useClientStore((s) => s.user);
    const [history, setHistory] = useState();

    const [modalState, setModalState] = useState({ type: null, item: null });

    const openModal = (type, item) => setModalState({ type, item });
    const closeModal = () => setModalState({ type: null, item: null });

    useEffect(() => {
        fecthHistory();
    }, []);

    const fecthHistory = async () => {
        try {
            const res = await getBookingHistory(user.id);
            setHistory(res.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const statusStyles = {
        COMPLETED: 'bg-green-100 text-green-700',
        PENDING: 'bg-yellow-100 text-yellow-700',
        IN_PROGRESS: 'bg-blue-100 text-blue-700',
    };

    return (
        <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
            <table className="w-full table-fixed border-collapse overflow-hidden rounded-xl">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase tracking-wider">
                        <th className="px-6 py-3 w-1/12">No.</th>
                        <th className="px-6 py-3 w-auto">Reference</th>
                        <th className="px-6 py-3 w-2/12 text-center">Status</th>
                        <th className="px-6 py-3 w-2/12 text-center">Manage</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {history?.map((item, index) => {
                        return (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition duration-150"
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">
                                            <span className="font-bold text-blue-700">
                                                Requester :
                                            </span>
                                            {item.title || 'Unknown'}
                                        </span>
                                        <span className="text-sm text-gray-500 line-clamp-3">
                                            {item.description}
                                        </span>
                                        <span className="text-xs font-light text-gray-400">
                                            Ref: {item.id}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            statusStyles[item.status] ||
                                            'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-around gap-2">
                                        <button
                                            onClick={() =>
                                                openModal('info', item)
                                            }
                                            className="text-blue-500 p-1 hover:bg-blue-200 rounded cursor-pointer"
                                        >
                                            <SearchAlert />
                                        </button>
                                        <button
                                            onClick={() =>
                                                openModal('edit', item)
                                            }
                                            className="text-orange-500 p-1 hover:bg-orange-200 rounded cursor-pointer"
                                        >
                                            <Bolt />
                                        </button>
                                        <button
                                            onClick={() =>
                                                openModal('delete', item)
                                            }
                                            className="text-red-500 p-1 hover:bg-red-200 rounded cursor-pointer"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {modalState.type && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="flex flex-col max-w-lg w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* INFO MODAL */}
                        {modalState.type === 'info' && (
                            <ModalInfomation
                                modalState={modalState}
                                closeModal={closeModal}
                            />
                        )}

                        {/* EDIT MODAL }
                        {modalState.type === 'edit' && (
                            <EditModal
                                item={modalState.item}
                                onClose={closeModal}
                                onSave={fetchHistory}
                            />
                        )} */}

                        {/* DELETE MODAL */}
                        {modalState.type === 'delete' && (
                            <ModalDeletaHistory
                                modalState={modalState}
                                closeModal={closeModal}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservHistoryTable;
