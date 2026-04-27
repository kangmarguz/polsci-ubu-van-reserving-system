import React from 'react';

const SubmitButton = ({ isSubmitting }) => {
    return (
        <div>
            <button
                className="w-full bg-blue-500 p-4 my-4 mx-2 rounded-2xl text-white font-bold cursor-pointer hover:bg-blue-700 transition duration-300"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Processing...' : 'Submit'}
            </button>
        </div>
    );
};

export default SubmitButton;
