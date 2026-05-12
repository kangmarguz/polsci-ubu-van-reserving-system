export const roleOptions = ['USER', 'ADMIN'];

export const normalizeUsers = (data) => {
    const users = data?.result || data?.users || data;
    return Array.isArray(users) ? users : [];
};

export const getUserDisplayName = (user) =>
    user.name || user.username || 'this user';
