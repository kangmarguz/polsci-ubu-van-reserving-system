import React from 'react';
import { motion } from 'motion/react';
import ReservHistory from './ReservHistory';
import ReservHistoryTable from './ReservHistoryTable';
import ButtonGoBackHome from '../../components/utils/ButtonGoBackHome';

const ReservVanHistory = () => {
    return (
        <div className="w-4/5 mx-auto my-4 border border-gray-100 rounded-2xl shadow-sm">
            <div>
                <ButtonGoBackHome />
                <h1 className="text-center text-blue-600 text-3xl font-bold my-4">
                    Booking Van History
                </h1>
                <motion.div
                    className="p-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ReservHistoryTable />
                </motion.div>
            </div>
        </div>
    );
};

export default ReservVanHistory;
