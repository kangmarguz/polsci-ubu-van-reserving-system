import React from 'react';
import { Link } from 'react-router';
import useClientStore from '../../store/client.store';

const AccressD9 = () => {
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
                <h1 className="text-4xl font-bold text-rose-500 mb-4">403</h1>
                <h2 className="text-xl font-semibold text-gray-800">
                    Access Denied
                </h2>
                <p className="text-gray-500 mt-3">
                    You need to sign in to access this page.
                </p>
                <Link
                    to={destination}
                    className="inline-block mt-6 px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
                >
                    {label}
                </Link>
            </div>
        </div>
    );
};

export default AccressD9;
