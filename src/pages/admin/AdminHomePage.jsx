import { motion } from 'motion/react';
import { Link } from 'react-router';
import CardsTemplate from '../../components/CardsTemplate';
import { ClipboardClock, FileCog, ShieldCheck, UserRoundCog, Van } from 'lucide-react';
import BookingMonthTable from '../../components/booking/BookingMonthTable';

const AdminHomePage = () => {
    return (
        <div className="w-4/5 mx-auto mt-3">
            <div className="px-4 py-5">
                <div className="flex flex-col gap-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                            <ShieldCheck size={26} />
                        </span>
                        <div>
                            <p className="text-sm font-semibold uppercase text-emerald-700">
                                Admin Dashboard
                            </p>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Van Reservation Management
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Review reservation activity, manage booking requests, and keep user access organized.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <BookingMonthTable />
            </div>
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
                        desc={'Create a new van reservation request.'}
                        icon={<Van size={128} />}
                        detail={'Create'}
                    />
                </Link>

                {/* My History Card */}
                <Link to="/home/history">
                    <CardsTemplate
                        title="My History"
                        desc="View your van reservation history."
                        icon={<ClipboardClock size={128} />}
                        detail={'View History'}
                    />
                </Link>

                <Link to="/admin/manage">
                    <CardsTemplate
                        title="Manage Booking"
                        desc="Review and process van reservation requests."
                        icon={<FileCog size={128} />}
                        detail={'View Booking'}
                    />
                </Link>
                <Link to="/admin/users">
                    <CardsTemplate
                        title="Manage Users"
                        desc="Manage user permissions and access."
                        icon={<UserRoundCog size={128} />}
                        detail={'View All Users'}
                    />
                </Link>
            </motion.div>
        </div>
    );
};

export default AdminHomePage;
