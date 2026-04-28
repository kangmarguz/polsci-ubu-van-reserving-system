import React from 'react';
import useClientStore from '../store/client.store';
import MainNav from '../components/navbar/MainNav';
import { Outlet } from 'react-router';
const LayoutAdmin = () => {
    const user = useClientStore((state) => state.user);
    return (
        <main>
            <MainNav name={user?.name} />
            <Outlet />
        </main>
    );
};

export default LayoutAdmin;
