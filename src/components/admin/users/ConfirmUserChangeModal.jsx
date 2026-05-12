import { LoaderCircle, X } from 'lucide-react';

const ConfirmUserChangeModal = ({
    change,
    isProcessing,
    onCancel,
    onConfirm,
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {change.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Please confirm before saving this change.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isProcessing}
                    className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Close confirmation modal"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="px-6 py-5">
                <p className="text-sm font-medium text-gray-700">
                    {change.message}
                </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isProcessing}
                    className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isProcessing}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
                >
                    {isProcessing && <LoaderCircle size={16} className="animate-spin" />}
                    Confirm
                </button>
            </div>
        </div>
    </div>
);

export default ConfirmUserChangeModal;
