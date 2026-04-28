import React, { useState } from 'react';
import { motion } from 'motion/react';
import InputText from '../../components/InputText';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputTextArea from '../../components/InputTextArea';
import SubmitButton from '../../components/SubmitButton';
import InputReservDetail from '../../components/reserv/InputReservDetail';
import { Link } from 'react-router';
import useClientStore from '../../store/client.store';
import dayjs from 'dayjs';

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
        start: futureDateSchema('start'),
        end: futureDateSchema('end'),
        detail: z.string().min(4, 'Detail must be at least 4 chars'),
        people: z.array(
            z.object({
                role: z.string().min(1, 'Please select role.'),
                name: z.string().min(1, 'Please fill a person name'),
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
            message: 'End date must be after start date',
            path: ['end'],
        },
    );

const ReservVanPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(reservSchema),
    });

    const user = useClientStore((s) => s.user);

    const [count, setCount] = useState(1);
    const increase = () => {
        setCount((prev) => Math.min(prev + 1, 10));
    };
    const decrease = () => {
        setCount((prev) => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data) => {
        try {
            console.log(user);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-4/5 mx-auto mt-">
            <div className="">
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
                                className="bg-red-400 px-5 py-2 rounded text-white font-bold cursor-pointer hover:bg-red-500 disabled:bg-red-200 disabled:cursor-not-allowed"
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
                                register={register}
                                errors={errors}
                                index={index}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between px-6 gap-4 my-4">
                        <button
                            className="w-1/2 bg-green-400 px-5 py-2 rounded text-white font-bold cursor-pointer hover:bg-green-500"
                            type="submit"
                        >
                            Submit
                        </button>
                        <Link
                            to="/home"
                            className="w-1/2 bg-red-400 px-5 py-2 rounded text-white text-center font-bold cursor-pointer hover:bg-red-500"
                        >
                            <button type="button">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservVanPage;
