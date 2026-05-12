import { useMemo } from 'react';
import { motion } from 'motion/react';
import {
    CalendarDays,
    CheckCircle2,
    FileText,
    Loader,
    Minus,
    Plus,
    UsersRound,
    X,
} from 'lucide-react';
import InputText from '../../components/InputText';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputTextArea from '../../components/InputTextArea';
import InputReservDetail from '../../components/reserv/InputReservDetail';
import { Link, useNavigate } from 'react-router';
import useClientStore from '../../store/client.store';
import dayjs from 'dayjs';
import { bookingVan } from '../../api/bookingVanAPI';
import { toast } from 'react-toastify';
import ButtonGoBackHome from '../../components/utils/ButtonGoBackHome';

const futureDateSchema = (fieldName) =>
    z
        .string()
        .min(1, `${fieldName} is required`)
        .refine((val) => dayjs(val).isValid(), 'Invalid date format')
        .refine((val) => {
            const today = dayjs().startOf('day');
            return !dayjs(val).isBefore(today);
        }, `${fieldName} cannot be in the past`);

const reservSchema = z
    .object({
        start: futureDateSchema('Start'),
        end: futureDateSchema('End'),
        detail: z.string().min(1, 'Please fill your detail infomation.'),
        people: z
            .array(
                z.object({
                    role: z.string().min(1, 'Please select role.'),
                    name: z.string().min(1, 'Please fill a person name'),
                    refID: z.string().optional(),
                }),
            )
            .min(1, 'Please add at least one person')
            .max(10, 'Maximum 10 people per booking'),
    })
    .refine(
        (data) => {
            const start = dayjs(data.start);
            const end = dayjs(data.end);
            return end.isSame(start) || end.isAfter(start);
        },
        {
            message: 'End date must be after Start date',
            path: ['end'],
        },
    );

const ReservVanBookingPage = () => {
    const today = useMemo(() => dayjs().format('YYYY-MM-DD'), []);
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(reservSchema),
        defaultValues: {
            start: '',
            end: '',
            detail: '',
            people: [{ role: '', name: '', refID: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'people',
    });

    const navigate = useNavigate();

    const user = useClientStore((s) => s.user);
    const redirectPath = user?.role === 'ADMIN' ? '/admin' : '/home';

    const startDate = watch('start');
    const peopleCount = fields.length;

    const increase = () => {
        if (peopleCount < 10) {
            append({ role: '', name: '', refID: '' });
        }
    };

    const decrease = () => {
        if (peopleCount > 1) {
            remove(peopleCount - 1);
        }
    };

    const onSubmit = async (data) => {
        try {
            const result = {
                ...data,
                user,
                start: dayjs(data.start).toISOString(),
                end: dayjs(data.end).toISOString(),
            };
            const res = await bookingVan(result);
            if (res.status === 200 || res.data?.success) {
                toast('Booking Success', { type: 'success' });
                navigate(redirectPath);
            } else {
                const errorMsg = res.data?.message || 'Booking Fail';
                toast(errorMsg, { type: 'error' });
            }
        } catch (error) {
            console.error('Booking Error:', error);
            const msg = error.response?.data?.message || 'Server Error';
            toast(msg, { type: 'error' });
        }
    };

    return (
        <div className="mx-auto my-4 w-[92%] max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <ButtonGoBackHome redirectPath={redirectPath} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-6 sm:px-6 lg:px-8"
            >
                <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                            <CalendarDays size={26} />
                        </span>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Van Booking
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Choose the trip dates, explain the purpose, and
                                add passenger details.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-blue-700">
                        <UsersRound size={20} />
                        <span className="text-sm font-bold">
                            {peopleCount}{' '}
                            {peopleCount === 1 ? 'person' : 'people'}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <section className="space-y-4">
                        <SectionTitle
                            icon={<CalendarDays size={18} />}
                            title="Trip Schedule"
                        />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <InputText
                                register={register}
                                name="start"
                                label="Start Date"
                                type="date"
                                errors={errors}
                                min={today}
                            />
                            <InputText
                                register={register}
                                name="end"
                                type="date"
                                label="End Date"
                                errors={errors}
                                min={startDate || today}
                            />
                        </div>
                    </section>

                    <section className="space-y-4">
                        <SectionTitle
                            icon={<FileText size={18} />}
                            title="Booking Detail"
                        />
                        <InputTextArea
                            register={register}
                            name="detail"
                            placeholder="Destination, purpose, time, and any important notes"
                            errors={errors}
                        />
                    </section>

                    <section className="space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <SectionTitle
                                icon={<UsersRound size={18} />}
                                title="Passenger List"
                            />
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <IconActionButton
                                    icon={<Plus size={18} />}
                                    label="Add Person"
                                    onClick={increase}
                                    disabled={peopleCount === 10}
                                    className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-200"
                                />
                                <IconActionButton
                                    icon={<Minus size={18} />}
                                    label="Remove Person"
                                    onClick={decrease}
                                    disabled={peopleCount === 1}
                                    className="bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <InputReservDetail
                                    key={field.id}
                                    name={`people.${index}.name`}
                                    role={`people.${index}.role`}
                                    refID={`people.${index}.refID`}
                                    register={register}
                                    errors={errors}
                                    index={index}
                                />
                            ))}
                        </div>
                    </section>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                        <Link
                            to={redirectPath}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            <X size={18} />
                            Cancel
                        </Link>
                        <button
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="animate-spin" size={18} />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={18} />
                                    Submit Booking
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const SectionTitle = ({ icon, title }) => (
    <div className="flex items-center gap-2 text-gray-900">
        <span className="text-blue-600">{icon}</span>
        <h2 className="text-base font-bold">{title}</h2>
    </div>
);

const IconActionButton = ({ icon, label, onClick, disabled, className }) => (
    <button
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed ${className}`}
        type="button"
        onClick={onClick}
        disabled={disabled}
    >
        {icon}
        {label}
    </button>
);

export default ReservVanBookingPage;
