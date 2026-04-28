import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import CardsTemplate from '../../components/CardsTemplate';
import { ClipboardClock, FileCog, Van } from 'lucide-react';

const AdminHomePage = () => {
    return (
        <div className="w-4/5 mx-auto mt-3">
            <div>ADMIN PAGE</div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Create Card */}
                <Link to="/home/booking">
                    <CardsTemplate
                        title={'Reserv Van'}
                        desc={'Create reserving infomation.'}
                        icon={<Van size={128} />}
                        detail={'Create'}
                    />
                </Link>

                {/* My History Card */}
                <Link to="/home/history">
                    <CardsTemplate
                        title="My history"
                        desc="View your reserving van history."
                        name="Recent"
                        icon={<ClipboardClock size={128} />}
                        detail={'View History'}
                    />
                </Link>

                <Link to="/admin/manage">
                    <CardsTemplate
                        title="Manage"
                        desc="Manage reqeust van reservation booking."
                        name="Recent"
                        icon={<FileCog size={128} />}
                        detail={'View Booking'}
                    />
                </Link>
            </motion.div>
        </div>
    );
};

export default AdminHomePage;
