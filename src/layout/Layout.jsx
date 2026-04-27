import React from 'react';
import useClientStore from '../store/client.store';

const Layout = () => {
    const user = useClientStore((state) => state.user);
    console.log(user);
    console.log(user?.payload);

    return (
        <div>
            Layout
            <p>{user?.payload?.name}</p>
            <p>{user?.payload?.email}</p>
        </div>
    );
};

export default Layout;
