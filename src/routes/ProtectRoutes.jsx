import React from 'react';
import useClientStore from '../store/client.store';
import { Navigate, Outlet, useLocation } from 'react-router';
import AccressD9 from '../components/utils/AccessD9';

const ProtectRoutes = ({ protect }) => {
    const token = useClientStore((s) => s.token);
    const locaiton = useLocation();

    if (!token) {
        return <AccressD9 />;
    }
    return protect;
};

export default ProtectRoutes;
