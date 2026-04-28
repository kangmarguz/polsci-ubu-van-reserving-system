import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputTextArea from '../components/InputTextArea';
import SubmitButton from '../components/SubmitButton';
import { useNavigate } from 'react-router';
import { registerUser } from '../api/userLogin';

const registerSchema = z
    .object({
        name: z.string().min(1, 'Please Fill your name'),
        username: z.string().min(4, 'Username must have at least 4 characters'),
        password: z.string().min(8, 'Password must have at least 8 characters'),
        confirmPassword: z.string().min(8, 'Confirm password is required'),
        email: z.string().email('Invalid email format'),
        phone: z.string().regex(/^[0-9]+$/, 'Phone must be a number.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });
// .superRefine((data, ctx) => {
//     if (data.password !== data.confirmPassword) {
//         ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Passwords don't match",
//         path: ['confirmPassword'],
//         });
//     }
// })

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();

    const onRegisterSubmit = async (data) => {
        try {
            const res = await registerUser(data);
            console.log(res.status);
            if (res.ok || (res.status >= 200 && res.status < 300)) {
                alert('register success');
                navigate('/');
            } else {
                alert('error', res.status);
            }
        } catch (error) {
            console.log(error);
            alert("A network error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Registation
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onRegisterSubmit)}
                    className="space-y-2"
                >
                    <InputTextArea
                        register={register}
                        name="name"
                        label="Name"
                        errors={errors}
                    />
                    <InputTextArea
                        register={register}
                        name="username"
                        label="Username"
                        errors={errors}
                    />
                    <InputTextArea
                        register={register}
                        name="password"
                        label="Password"
                        errors={errors}
                    />
                    <InputTextArea
                        register={register}
                        name="confirmPassword"
                        label="Confirm Password"
                        errors={errors}
                    />
                    <InputTextArea
                        register={register}
                        name="email"
                        placeholder={'example.test@email.com'}
                        label="Email"
                        errors={errors}
                    />
                    <InputTextArea
                        register={register}
                        name="phone"
                        label="Phone Number"
                        placeholder={'08XXXXXXXX'}
                        errors={errors}
                    />
                    <div className="pt-2">
                        <SubmitButton isSubmitting={isSubmitting} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
