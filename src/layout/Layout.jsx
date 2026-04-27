import React from 'react';
import useClientStore from '../store/client.store';

const Layout = () => {
    const user = useClientStore((state) => state.user);
    const token = useClientStore((state)=> state.token);
    
    return (
        <div>
            Layout
            <p>{user?.username}</p>
            <p>{user?.email}</p>
            <p>{token}</p>
        </div>
    );
};

export default Layout;
