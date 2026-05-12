import React from 'react';

const InputReservDetail = ({ register, index, name, role, refID, errors }) => {
    const nameError = errors?.people?.[index]?.name;
    const roleError = errors?.people?.[index]?.role;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-bold uppercase text-gray-500">
                    Person {index + 1}
                </p>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                    Passenger
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        {...register(role)}
                        defaultValue=""
                        className={`w-full rounded-lg border px-3 py-2 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                            roleError ? 'border-red-400' : 'border-gray-300'
                        }`}
                    >
                        <option value="" disabled>
                            Please select
                        </option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                        <option value="Other">Other</option>
                    </select>
                    {roleError && (
                        <p className="text-sm text-red-500">
                            {roleError.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col space-y-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        {...register(name)}
                        type="text"
                        className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                            nameError ? 'border-red-400' : 'border-gray-300'
                        }`}
                        placeholder="Enter name"
                    />
                    {nameError && (
                        <p className="text-sm text-red-500">
                            {nameError.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Reference ID
                    </label>
                    <input
                        {...register(refID)}
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        placeholder="Optional"
                    />
                </div>
            </div>
        </div>
    );
};

export default InputReservDetail;
