import dayjs from 'dayjs';
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from 'lucide-react';

const BookingMonthHeader = ({
    reservedDays,
    selectedMonth,
    onMonthChange,
    onRefresh,
}) => (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <CalendarDays size={24} />
            </span>
            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    Van Reservation Calendar
                </h2>
                <p className="text-sm text-gray-500">
                    {reservedDays} reserved day{reservedDays === 1 ? '' : 's'} in{' '}
                    {selectedMonth.format('MMMM YYYY')}
                </p>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() => onMonthChange((prev) => prev.subtract(1, 'month'))}
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                aria-label="Previous month"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                type="button"
                onClick={() => onMonthChange(dayjs().startOf('month'))}
                className="inline-flex h-10 cursor-pointer items-center rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
                Today
            </button>
            <button
                type="button"
                onClick={() => onMonthChange((prev) => prev.add(1, 'month'))}
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                aria-label="Next month"
            >
                <ChevronRight size={20} />
            </button>
            <button
                type="button"
                onClick={onRefresh}
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-emerald-100 text-emerald-700 transition hover:bg-emerald-50"
                aria-label="Refresh calendar"
            >
                <RefreshCw size={18} />
            </button>
        </div>
    </div>
);

export default BookingMonthHeader;
