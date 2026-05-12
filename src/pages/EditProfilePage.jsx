import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, ShieldCheck, UserRound } from 'lucide-react';
import { toast } from 'react-toastify';

import { updateUserPassword } from '../api/userLogin';
import InputText from '../components/InputText';
import SubmitButton from '../components/SubmitButton';
import ButtonGoBackHome from '../components/utils/ButtonGoBackHome';
import useClientStore from '../store/client.store';

const passwordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8, 'Current password must have at least 8 characters'),
        newPassword: z
            .string()
            .min(8, 'New password must have at least 8 characters'),
        confirmPassword: z.string().min(8, 'Confirm password is required'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

const EditProfilePage = () => {
    const user = useClientStore((s) => s.user);
    const redirectPath = user?.role === 'ADMIN' ? '/admin' : '/home';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            await updateUserPassword(user.id, {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });
            reset();
            toast('Password changed successfully', { type: 'success' });
        } catch (error) {
            console.error('Change password failed:', error);
            toast(error.response?.data?.message || 'Cannot change password', {
                type: 'error',
            });
        }
    };
    
    console.log(user);
    

    return (
        <div className="w-4/5 mx-auto my-4 border border-gray-100 rounded-2xl shadow-sm">
            <ButtonGoBackHome redirectPath={redirectPath} />
            <motion.div
                className="mx-auto max-w-2xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="mb-6 flex items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-5">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                        <KeyRound size={26} />
                    </span>
                    <div>
                        <p className="text-sm font-semibold uppercase text-emerald-700">
                            Account Security
                        </p>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Change Password
                        </h1>
                        <p className="text-sm text-gray-600">
                            Update your password to keep your account secure.
                        </p>
                    </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ProfileInfo
                        icon={<UserRound size={18} />}
                        label="Username"
                        value={user?.name || '-'}
                    />
                    <ProfileInfo
                        icon={<ShieldCheck size={18} />}
                        label="Role"
                        value={user?.role || '-'}
                    />
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <InputText
                        register={register}
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        errors={errors}
                    />
                    <InputText
                        register={register}
                        name="newPassword"
                        label="New Password"
                        type="password"
                        errors={errors}
                    />
                    <InputText
                        register={register}
                        name="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        errors={errors}
                    />

                    <div className="pt-2">
                        <SubmitButton
                            textButton="Change Password"
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const ProfileInfo = ({ icon, label, value }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-emerald-700">
            {icon}
            <span className="text-xs font-bold uppercase text-gray-500">
                {label}
            </span>
        </div>
        <p className="truncate text-sm font-semibold text-gray-900">{value}</p>
    </div>
);

export default EditProfilePage;
