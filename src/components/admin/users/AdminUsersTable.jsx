import { LoaderCircle, Power, ShieldCheck } from 'lucide-react';

import { roleOptions } from './userManagementUtils';

const AdminUsersTable = ({
    users,
    isLoading,
    updatingUserId,
    onRoleChange,
    onActiveChange,
}) => (
    <div className="overflow-x-auto overflow-y-auto max-h-[62vh] rounded-xl border border-gray-200">
        <table className="w-full min-w-160 table-fixed border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-100 shadow-sm">
                <tr className="text-left text-sm uppercase tracking-wider text-gray-700">
                    <th className="w-1/12 bg-gray-100 px-6 py-3">No.</th>
                    <th className="w-5/12 bg-gray-100 px-6 py-3">Name</th>
                    <th className="w-3/12 bg-gray-100 px-6 py-3 text-center">
                        Active
                    </th>
                    <th className="w-3/12 bg-gray-100 px-6 py-3 text-center">
                        Role
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading && <LoadingRow />}

                {!isLoading && users.length === 0 && <EmptyRow />}

                {!isLoading &&
                    users.map((user, index) => (
                        <UserRow
                            key={user.id || index}
                            user={user}
                            index={index}
                            isUpdating={updatingUserId === user.id}
                            onRoleChange={onRoleChange}
                            onActiveChange={onActiveChange}
                        />
                    ))}
            </tbody>
        </table>
    </div>
);

const UserRow = ({ user, index, isUpdating, onRoleChange, onActiveChange }) => (
    <tr className="transition duration-150 hover:bg-gray-50">
        <td className="px-6 py-4 text-gray-700">{index + 1}</td>
        <td className="px-6 py-4">
            <div className="flex flex-col">
                <span className="font-semibold text-gray-900">
                    {user.name || user.username || 'Unknown user'}
                </span>
                {user.email && (
                    <span className="text-sm text-gray-500">{user.email}</span>
                )}
            </div>
        </td>
        <td className="px-6 py-4 text-center">
            <button
                type="button"
                onClick={() => onActiveChange(user)}
                disabled={isUpdating}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    user.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
            >
                <Power size={13} />
                {user.isActive ? 'Active' : 'Inactive'}
            </button>
        </td>
        <td className="px-6 py-4 text-center">
            <div className="inline-flex items-center gap-2">
                {isUpdating && (
                    <LoaderCircle size={16} className="animate-spin text-gray-400" />
                )}
                <ShieldCheck size={16} className="text-emerald-600" />
                <select
                    value={user.role || 'USER'}
                    onChange={(event) => onRoleChange(user, event.target.value)}
                    disabled={isUpdating}
                    className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 outline-none transition hover:border-emerald-300 focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {roleOptions.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>
        </td>
    </tr>
);

const LoadingRow = () => (
    <tr>
        <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
            <div className="inline-flex items-center gap-2">
                <LoaderCircle size={20} className="animate-spin" />
                Loading users...
            </div>
        </td>
    </tr>
);

const EmptyRow = () => (
    <tr>
        <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
            No users found.
        </td>
    </tr>
);

export default AdminUsersTable;
