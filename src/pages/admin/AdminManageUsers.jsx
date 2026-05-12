import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';

import {
    getAllUsers,
    updateUserActive,
    updateUserRole,
} from '../../api/adminUserAPI';
import AdminUsersHeader from '../../components/admin/users/AdminUsersHeader';
import AdminUsersTable from '../../components/admin/users/AdminUsersTable';
import ConfirmUserChangeModal from '../../components/admin/users/ConfirmUserChangeModal';
import {
    getUserDisplayName,
    normalizeUsers,
} from '../../components/admin/users/userManagementUtils';
import ButtonGoBackHome from '../../components/utils/ButtonGoBackHome';

const AdminManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const [pendingChange, setPendingChange] = useState(null);
    const [searchText, setSearchText] = useState('');

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllUsers();
            setUsers(normalizeUsers(res.data));
        } catch (error) {
            console.error('Fetch users failed:', error);
            toast('Cannot load users', { type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        Promise.resolve().then(fetchUsers);
    }, [fetchUsers]);

    const activeUsersCount = useMemo(
        () => users.filter((user) => Boolean(user.isActive)).length,
        [users],
    );

    const filteredUsers = useMemo(() => {
        const keyword = searchText.trim().toLowerCase();
        if (!keyword) return users;

        return users.filter((user) =>
            [user.username, user.email, user.name]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(keyword),
        );
    }, [searchText, users]);

    const requestRoleChange = (user, role) => {
        if (role === user.role) return;

        setPendingChange({
            type: 'role',
            user,
            nextValue: role,
            title: 'Confirm Role Change',
            message: `Change ${getUserDisplayName(user)} role from ${user.role || 'USER'} to ${role}?`,
        });
    };

    const requestActiveChange = (user) => {
        setPendingChange({
            type: 'active',
            user,
            nextValue: !user.isActive,
            title: user.isActive ? 'Deactivate User' : 'Activate User',
            message: `${user.isActive ? 'Deactivate' : 'Activate'} ${getUserDisplayName(user)}?`,
        });
    };

    const handleConfirmChange = async () => {
        if (!pendingChange) return;

        const { type, user, nextValue } = pendingChange;

        setUpdatingUserId(user.id);
        try {
            const res =
                type === 'role'
                    ? await updateUserRole(user.id, nextValue)
                    : await updateUserActive(user.id, nextValue);
            const fallbackUser =
                type === 'role'
                    ? { ...user, role: nextValue }
                    : { ...user, isActive: nextValue };
            const updatedUser = res.data?.result || res.data?.user || fallbackUser;

            setUsers((prev) =>
                prev.map((item) =>
                    item.id === user.id ? { ...item, ...updatedUser } : item,
                ),
            );
            toast(getSuccessMessage(type), { type: 'success' });
            setPendingChange(null);
        } catch (error) {
            console.error('Update user failed:', error);
            toast('Cannot update user', { type: 'error' });
        } finally {
            setUpdatingUserId(null);
        }
    };

    return (
        <div className="w-4/5 mx-auto my-4 border border-gray-100 rounded-2xl shadow-sm">
            <ButtonGoBackHome redirectPath="/admin" />
            <motion.div
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <AdminUsersHeader
                    totalUsers={users.length}
                    activeUsersCount={activeUsersCount}
                    isLoading={isLoading}
                    searchText={searchText}
                    onRefresh={fetchUsers}
                    onSearchChange={setSearchText}
                />

                <AdminUsersTable
                    users={filteredUsers}
                    isLoading={isLoading}
                    updatingUserId={updatingUserId}
                    onRoleChange={requestRoleChange}
                    onActiveChange={requestActiveChange}
                />
            </motion.div>

            {pendingChange && (
                <ConfirmUserChangeModal
                    change={pendingChange}
                    isProcessing={updatingUserId === pendingChange.user.id}
                    onCancel={() => setPendingChange(null)}
                    onConfirm={handleConfirmChange}
                />
            )}
        </div>
    );
};

const getSuccessMessage = (type) =>
    type === 'role'
        ? 'User role updated successfully'
        : 'User active status updated successfully';

export default AdminManageUsers;
