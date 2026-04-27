import React from 'react';
import { Loader } from 'lucide-react';
const SubmitButton = ({ isSubmitting, textButton }) => {
    return (
        <div>
            <button
                className="w-full bg-blue-500 p-4 my-4 mx-2 rounded-2xl text-white font-bold cursor-pointer hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-blue-300 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader className="animate-spin" size={20} />
                        Processing...
                    </span>
                ) : (
                    textButton || 'Submit'
                )}
            </button>
        </div>
    );
};

export default SubmitButton;
