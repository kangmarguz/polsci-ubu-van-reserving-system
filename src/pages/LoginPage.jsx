import React from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../components/InputText';
import SubmitButton from '../components/SubmitButton';
import { loginUser } from '../api/userLogin';
import useClientStore from '../store/client.store';
import { Link, useNavigate } from 'react-router';

const loginSchema = z.object({
    username: z.string().min(4, 'Username have a least 4 characters'),
    password: z.string().min(8, 'Password have a least 8 characters'),
});

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();

    const actionLoginToGetUser = useClientStore((s) => s.actionLoginToGetUser);

    const onSubmit = async (data) => {
        try {
            await actionLoginToGetUser(data);
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100"
            >
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Please enter your details to login
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <InputText
                        register={register}
                        name="username"
                        label="Username"
                        errors={errors}
                    />

                    <InputText
                        register={register}
                        name="password"
                        label="Password"
                        type="password" // IMPORTANT: Changed from 'text' for security
                        errors={errors}
                    />

                    <div className="pt-2">
                        <SubmitButton
                            textButton="Login"
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/register "
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
