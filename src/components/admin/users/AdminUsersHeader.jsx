import { RefreshCw, Search, UsersRound } from 'lucide-react';

const AdminUsersHeader = ({
    totalUsers,
    activeUsersCount,
    isLoading,
    searchText,
    onRefresh,
    onSearchChange,
}) => (
    <div className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <UsersRound size={26} />
                </span>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Manage Users
                    </h1>
                    <p className="text-sm text-gray-500">
                        {totalUsers} total users, {activeUsersCount} active accounts
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                disabled={isLoading}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                Refresh
            </button>
        </div>

        <div className="relative max-w-xl">
            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
                type="text"
                value={searchText}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by username or email"
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm font-medium text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
        </div>
    </div>
);

export default AdminUsersHeader;
