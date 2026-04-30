import React, { useEffect, useState } from 'react';
import { getBookingHistory } from '../../api/bookingVanAPI';
import useClientStore from '../../store/client.store';

const ReservHistory = () => {
    const user = useClientStore((s) => s.user);
    const [history, setHistory] = useState();

    useEffect(() => {
        fecthHistory();
    }, []);

    const fecthHistory = async () => {
        try {
            const res = await getBookingHistory(user.id ,6);
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
            <table className="w-full border-collapse overflow-hidden rounded-xl">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase tracking-wider">
                        <th className="px-6 py-3">No.</th>
                        <th className="px-6 py-3">Reference</th>
                        {/* <th className="px-6 py-3">Follower List</th> */}
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {history?.map((item, index) => {
                        return (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition duration-150"
                            >
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibol">
                                        {index + 1}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">
                                            <span className="font-bold text-blue-700">
                                                Requester : 
                                            </span>
                                            {item.title || "Unknown"}
                                        </span>
                                        <span className="text-sm text-gray-500 line-clamp-3">
                                            {item.description}
                                        </span>
                                        <span className="text-xs font-light text-gray-400">
                                            Ref: {item.id}
                                        </span>
                                    </div>
                                </td>
                                {/* <td className="px-6 py-4">
                                    {item.taskImages.map((people, index) => {
                                        return (
                                            <div key={people.id}>
                                                <p className="px-3 py-1 rounded-full text-xs font-semibol">
                                                    Role: {people.url}
                                                </p>
                                                <p className="px-3 py-1 rounded-full text-xs font-semibol">
                                                    RefID: {people.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </td> */}

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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ReservHistory;
