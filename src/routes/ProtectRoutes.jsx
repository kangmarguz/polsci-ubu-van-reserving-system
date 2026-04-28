import React from 'react';
import useClientStore from '../store/client.store';
import { Navigate, Outlet, useLocation } from 'react-router';
import AccressD9 from '../components/utils/AccessD9';

const ProtectRoutes = ({ protect, allowedRole }) => {
    const token = useClientStore((s) => s.token);
    const user = useClientStore((s) => s.user);
    const locaiton = useLocation();

    if (!token) {
        return <AccressD9 />;
    }

    // // If allowedRole is specified, check user role
    // if (allowedRole && user?.role !== allowedRole) {
    //     return <AccressD9 />;
    // }

    return protect;
};

export default ProtectRoutes;
