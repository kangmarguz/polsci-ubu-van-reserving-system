import React from 'react';
import useClientStore from '../store/client.store';
import MainNav from '../components/navbar/MainNav';

const Layout = () => {
    const user = useClientStore((state) => state.user);
    const token = useClientStore((state)=> state.token);
    
    console.log(user);
    
    return (
        <div>
            <MainNav name={user?.name}/>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
        </div>
    );
};

export default Layout;
