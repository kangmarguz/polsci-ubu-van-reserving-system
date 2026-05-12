import React from 'react';
import useClientStore from '../store/client.store';
import { Navigate, useLocation } from 'react-router';
import AccressD9 from '../components/utils/AccessD9';

const ProtectRoutes = ({ protect, allowedRole }) => {
    const token = useClientStore((s) => s.token);
    const user = useClientStore((s) => s.user);
    const location = useLocation();

    if (!token) {
        return <AccressD9 />;
    }

    if (user?.passwordResetRequired && location.pathname !== '/profile') {
        return <Navigate to="/profile" replace />;
    }

    if (allowedRole && user?.role !== allowedRole) {
        return <AccressD9 />;
    }

    return protect;
};

export default ProtectRoutes;
