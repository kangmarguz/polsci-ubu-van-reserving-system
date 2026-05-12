import MonthDayCell from './MonthDayCell';
import { chunkWeeks, weekDays } from './bookingMonthUtils';

const BookingMonthGrid = ({ monthDays, bookingsByDate, selectedMonth }) => (
    <div className="overflow-x-auto">
        <table className="w-full min-w-180 table-fixed border-collapse">
            <thead>
                <tr>
                    {weekDays.map((day) => (
                        <th
                            key={day}
                            className="border border-gray-200 bg-gray-50 px-2 py-3 text-center text-xs font-bold uppercase text-gray-500"
                        >
                            {day}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {chunkWeeks(monthDays).map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day) => {
                            const key = day.date.format('YYYY-MM-DD');

                            return (
                                <MonthDayCell
                                    key={key}
                                    day={day}
                                    bookings={bookingsByDate.get(key) || []}
                                    selectedMonth={selectedMonth}
                                />
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default BookingMonthGrid;
