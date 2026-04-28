import React, { useState } from 'react';
import InputText from '../../components/InputText';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputTextArea from '../../components/InputTextArea';
import SubmitButton from '../../components/SubmitButton';
import InputReservDetail from '../../components/reserv/InputReservDetail';

const reservSchema = z.object({
    start: z.string().min(1, 'Start is required'),
    end: z.string().min(1, 'End is required'),
    detail: z.string().min(4, 'Detail must be at least 4 chars'),
    people: z.array(
        z.object({
            role: z.string().min(1, 'Please select role.'),
            name: z.string().min(1, 'Please fill a person name'),
        }),
    ),
});
const ReservVanPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(reservSchema),
    });

    const [count, setCount] = useState(1);

    const increase = () => {
        setCount((prev) => Math.min(prev + 1, 10));
    };

    const decrease = () => {
        setCount((prev) => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data) => {
        try {
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-4/5 mx-auto mt-">
            <div className="">
                    <h1 className="text-center text-3xl font-bold my-4">Please Fill Detail</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 px-6 gap-4">
                        <InputText
                            register={register}
                            name="start"
                            label="Start Date"
                            errors={errors}
                        />
                        <InputText
                            register={register}
                            name="end"
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
                        <div>
                            <button
                                className="bg-green-400 px-5 py-2 rounded text-white font-bold cursor-pointer hover:bg-green-500"
                                type="submit"
                            >
                                Submit
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
                </form>
            </div>
        </div>
    );
};

export default ReservVanPage;
