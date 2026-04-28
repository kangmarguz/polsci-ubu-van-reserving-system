import React from 'react';

const InputTextArea = ({ register, name, placeholder, errors }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label
                htmlFor={name}
                className="capitalize text-sm font-medium text-gray-700"
            >
                {name}
            </label>

            <textarea
                id={name}
                {...register(name)}
                placeholder={placeholder}
                rows={4}
                className={`w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 shadow-sm transition-all duration-200 resize-none  ${errors[name] && 'border-red-500'}`}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]?.message}</p>
            )}
        </div>
    );
};

export default InputTextArea;
