import React from 'react';

const InputText = ({ register, name, label, errors, type , placeholder}) => {
    const hasError = !!errors[name];
    return (
        <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-sm font-medium text-gray-700 ml-1">
                {label || 'Field'}
            </label>

            <input
                {...register(name)}
                type={type}
                className={`    
                    w-full px-4 py-2.5 rounded-xl border transition-all duration-200 outline-none
                    ${
                        hasError
                            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }   
                `}
                placeholder={placeholder || `Enter your ${label?.toLowerCase()}`}
            />

            {errors[name] && (
                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default InputText;
