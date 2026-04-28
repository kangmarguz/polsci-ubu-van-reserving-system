import React from 'react';
import useClientStore from '../store/client.store';
import MainNav from '../components/navbar/MainNav';
import { Outlet } from 'react-router';

const Layout = () => {
    const user = useClientStore((state) => state.user);
    const token = useClientStore((state) => state.token);

    return (
        <main>
            <MainNav name={user?.name} />
            <Outlet />
        </main>
    );
};

export default Layout;
