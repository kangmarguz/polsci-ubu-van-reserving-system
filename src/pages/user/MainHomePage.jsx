import React from 'react';
import { motion } from 'motion/react';
import CardsTemplate from '../../components/CardsTemplate';
import { Van, ClipboardClock, FileCog, ClockCheck } from 'lucide-react';
import { Link } from 'react-router';
import useClientStore from '../../store/client.store';
import ReservHistory from './ReservHistory';
const MainHomePage = () => {
    const user = useClientStore((s) => s.user);

    return (
        <div className="w-4/5 mx-auto mt-3">
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Create Card */}
                <Link to="booking">
                    <CardsTemplate
                        title={'Reserv Van'}
                        desc={'Create reserving infomation.'}
                        icon={<Van size={128} />}
                        detail={'Create'}
                    />
                </Link>

                {/* My History Card */}
                <Link to="history">
                    <CardsTemplate
                        title="My history"
                        desc="View your reserving van history."
                        name="Recent"
                        icon={<ClipboardClock size={128} />}
                        detail={'View History'}
                    />
                </Link>
            </motion.div>
            <div className="p-4 flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-700">
                    Latest event coming soon
                </h1>
                <div className='text-gray-700'>
                    <ClockCheck size={24} />
                </div>
            </div>
            <div className="p-4">
                <ReservHistory />
            </div>
        </div>
    );
};

export default MainHomePage;
