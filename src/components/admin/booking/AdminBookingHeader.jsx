import { RefreshCcw, Search } from 'lucide-react';

const AdminBookingHeader = ({
    isLoading,
    searchText,
    onRefresh,
    onSearchChange,
}) => (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-4">
        <div>
            <h1 className="text-blue-600 text-3xl font-bold">
                Manage Booking
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Review van reservation requests and process approval.
            </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search booking"
                    className="w-full sm:w-64 pl-10 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
            </div>
            <button
                type="button"
                onClick={onRefresh}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
                <RefreshCcw
                    size={16}
                    className={isLoading ? 'animate-spin' : ''}
                />
                Refresh
            </button>
        </div>
    </div>
);

export default AdminBookingHeader;
