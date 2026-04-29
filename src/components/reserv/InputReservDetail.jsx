import React from 'react';

const InputReservDetail = ({ register, index, name, role, refID, errors }) => {
    const nameError = errors?.people?.[index]?.name;
    const roleError = errors?.people?.[index]?.role;

    return (
        <div className="max-w mb-2 mx-auto bg-white border border-gray-200 rounded-2xl p-4 space-y-6">
            <p className="capitalize text-md font-medium text-gray-700">
                Person: {index + 1}
            </p>
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Role
                </label>
                <select
                    {...register(role)}
                    defaultValue=""
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                    <option value="" disabled>
                        Please Select
                    </option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="Other">Other</option>
                </select>
                {roleError && (
                    <p className="text-sm text-red-500">{roleError.message}</p>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    {...register(name)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter Name"
                />
                {nameError && (
                    <p className="text-sm text-red-500">{nameError.message}</p>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Refernce ID
                </label>
                <input
                    {...register(refID)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Refernce ID"
                />
            </div>
        </div>
    );
};

export default InputReservDetail;
