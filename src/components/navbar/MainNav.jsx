import React from 'react';
import useClientStore from '../../store/client.store';
import { useNavigate } from 'react-router';

const MainNav = ({ name }) => {
    const navigate = useNavigate();
    const actionLogout = useClientStore((s) => s.actionLogout);

    const handleLogout = () => {
        try {
            actionLogout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-orange-100 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto flex py-1 px-4 justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center">
                    <p className="text-2xl font-semibold tracking-tight text-green-600 cursor-pointer hover:opacity-80 transition-opacity">
                        LOGO :  Political Science UBU.    
                    </p>
                </div>

                {/* User Actions Section */}
                <div className="flex items-center justify-end gap-8">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-md text-gray-500 font-medium uppercase tracking-wider">
                            Welcome
                        </span>
                        <p className="text-md font-semibold text-gray-800">
                            {name || 'Guest User'}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-50 text-red-600 px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer active:scale-95 border border-red-100 shadow-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default MainNav;
