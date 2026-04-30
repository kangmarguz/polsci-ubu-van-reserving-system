import React, { useState } from 'react';
import { motion } from 'motion/react';
import InputText from '../../components/InputText';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputTextArea from '../../components/InputTextArea';
import SubmitButton from '../../components/SubmitButton';
import InputReservDetail from '../../components/reserv/InputReservDetail';
import { Link, useNavigate } from 'react-router';
import useClientStore from '../../store/client.store';
import dayjs from 'dayjs';
import { bookingVan } from '../../api/bookingVanAPI';
import ButtonSubmitAndCancel from '../../components/utils/ButtonSubmitAndCancel';
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
        people: z.array(
            z.object({
                role: z.string().min(1, 'Please select role.'),
                name: z.string().min(1, 'Please fill a person name'),
                refID: z.string().optional(),
            }),
        ),
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
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(reservSchema),
    });

    const nagivate = useNavigate();

    const user = useClientStore((s) => s.user);

    const [count, setCount] = useState(1);
    const increase = () => {
        setCount((prev) => Math.min(prev + 1, 10));
    };
    const decrease = () => {
        setCount((prev) => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data) => {
        const redirectPath = user?.role === 'ADMIN' ? '/admin' : '/home';
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
                nagivate(redirectPath);
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
        <div className="w-4/5 mx-auto mt-4">
            <ButtonGoBackHome />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-center text-blue-600 text-3xl font-bold my-4">
                    Van Booking
                </h1>
                <p className="text-center text-md font-light my-2 text-gray-500">
                    Please fill all detail to booking the van.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 px-6 gap-4">
                        <InputText
                            register={register}
                            name="start"
                            label="Start Date"
                            type="date"
                            errors={errors}
                        />
                        <InputText
                            register={register}
                            name="end"
                            type="date"
                            label="End Date"
                            errors={errors}
                        />
                    </div>
                    <div className="grid grid-cols-1 px-6 gap-4 py-2">
                        <InputTextArea
                            register={register}
                            name="detail"
                            placeholder="Please fill detail to reserving van"
                            errors={errors}
                        />
                    </div>
                    <div className="flex justify-between px-6 gap-4 my-4">
                        <div className="flex items-center gap-2">
                            <button
                                className="bg-blue-400 px-5 py-2 rounded text-white font-bold cursor-pointer hover:bg-blue-500 disabled:bg-blue-200 disabled:cursor-not-allowed"
                                type="button"
                                onClick={increase}
                                disabled={count === 10}
                            >
                                Add Person
                            </button>
                            <button
                                className="bg-orange-300 px-5 py-2 rounded text-white font-bold cursor-pointer hover:bg-orange-400 disabled:bg-orange-200 disabled:cursor-not-allowed"
                                type="button"
                                onClick={decrease}
                                disabled={count === 1}
                            >
                                Remove Person
                            </button>
                        </div>
                    </div>

                    <div className="px-6 my-4">
                        {Array.from({ length: count }).map((_, index) => (
                            <InputReservDetail
                                key={index}
                                name={`people.${index}.name`}
                                role={`people.${index}.role`}
                                refID={`people.${index}.refID`}
                                register={register}
                                errors={errors}
                                index={index}
                            />
                        ))}
                    </div>
                    <ButtonSubmitAndCancel
                        role={user.role}
                        isSubmitting={isSubmitting}
                    />
                </form>
            </motion.div>
        </div>
    );
};

export default ReservVanBookingPage;
