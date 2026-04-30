import React from 'react';
import ReservHistory from './ReservHistory';
import ReservHistoryTable from './ReservHistoryTable';

const ReservVanHistory = () => {
    return (
        <div className="w-4/5 mx-auto mt-4 bg-teal-100">
            <div>
                <h1 className="text-center text-blue-600 text-3xl font-bold my-4">
                    History Lists.
                </h1>
                <div className="p-4">
                    <ReservHistoryTable />
                </div>
            </div>
        </div>
    );
};

export default ReservVanHistory;
