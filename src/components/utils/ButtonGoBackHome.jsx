import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, House } from 'lucide-react';
const ButtonGoBackHome = () => {
    const navigate = useNavigate();
    const handleOnclick = () => {
        navigate('/home');
    };

    return (
        <div className="inline-block p-4">
            <button
                onClick={() => navigate('/home')}
                className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 cursor-pointer rounded-xl hover:bg-gray-100 hover:text-indigo-700 active:scale-95"
            > 
                <span className="transition-transform duration-200 group-hover:-translate-x-1">
                    <ChevronLeft></ChevronLeft>
                </span>

                <div className="flex gap-2 items-center">
                    <span>Back to Home</span>
                    <House />
                </div>
            </button>
        </div>
    );
};

export default ButtonGoBackHome;
