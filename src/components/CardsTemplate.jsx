import React from 'react';
import { ChevronRight } from 'lucide-react';
const CardsTemplate = ({ title, desc, detail, icon }) => {
    return (
        <div className="relative flex flex-col items-center bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 cursor-pointer group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linaer-to-r from-blue-400 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <h3 className="text-center font-semibold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {title}
            </h3>

            <div className="text-gray-400 text-3xl mb-2 group-hover:text-blue-500 transition-colors">
                {icon}
            </div>

            <p className="text-sm text-gray-500 text-center leading-relaxed mb-4">
                {desc}
            </p>

            <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:gap-4 transition-all">
                {detail}
                <ChevronRight />
            </div>
        </div>
    );
};

export default CardsTemplate;
