import { Loader } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const ButtonSubmitAndCancel = ({ role, isSubmitting }) => {
    return (
        <div className="flex justify-between px-6 gap-4 my-4">
            <button
                className="w-1/2 bg-green-400 px-5 py-2 rounded text-white font-bold cursor-pointer hover:bg-green-500"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader className="animate-spin" size={20} />
                        Processing...
                    </span>
                ) : (
                    'Submit'
                )}
            </button>
            <Link
                to={role === 'ADMIN' ? '/admin' : '/home'}
                className="w-1/2 bg-red-400 px-5 py-2 rounded text-white text-center font-bold cursor-pointer hover:bg-red-500"
            >
                <button type="button">Cancel C</button>
            </Link>
        </div>
    );
};

export default ButtonSubmitAndCancel;
