import React from 'react';

const ModalDeletaHistory = ({ modalState, closeModal }) => {
    const handleDelete = (id) => {
        console.log(id);    
    };
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-800">Delete booking</h2>
                <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
            </div>
            <hr className="mb-4" />
            <p className="text-sm text-gray-600 text-center">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-800">
                    {modalState.item.id}
                </span>
                ? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2 mt-5">
                <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={() => handleDelete(modalState.item.id)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
                >
                    Yes, delete
                </button>
            </div>
        </>
    );
};

export default ModalDeletaHistory;
