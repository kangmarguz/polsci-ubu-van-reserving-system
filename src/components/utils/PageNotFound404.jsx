import React from 'react';
import useClientStore from '../../store/client.store';
import { Link } from 'react-router';

const PageNotFound404 = () => {
    const user = useClientStore((s) => s.user);
    const destination = user
        ? user.role === 'ADMIN'
            ? '/admin'
            : '/home'
        : '/';
    const label = user ? 'Go to Home' : 'Go to Login';
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 to-pink-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
                <h1 className="text-5xl font-bold text-purple-500 mb-4">404</h1>

                <h2 className="text-xl font-semibold text-gray-800">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mt-3">
                    Sorry, the page you are looking for doesn’t exist or has
                    been moved.
                </p>

                <Link
                    to={destination}
                    className="inline-block mt-6 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300"
                >
                    {label}
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound404;
