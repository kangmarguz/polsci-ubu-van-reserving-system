import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, LogOut, ShieldCheck, UserPen, UserRound } from 'lucide-react';
import useClientStore from '../../store/client.store';

const MainNav = ({ name }) => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = useClientStore((s) => s.user);
    const actionLogout = useClientStore((s) => s.actionLogout);
    const displayName = name || 'Guest User';

    const handleGoHome = () => {
        if (user?.role === 'ADMIN') {
            navigate('/admin');
            return;
        }

        if (user) {
            navigate('/home');
            return;
        }

        navigate('/');
    };

    const handleLogout = () => {
        try {
            setIsProfileOpen(false);
            actionLogout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePassword = () => {
        setIsProfileOpen(false);
        navigate('/profile');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-emerald-100/80 bg-white/90 shadow-sm backdrop-blur-xl">
            <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={handleGoHome}
                    className="group flex min-w-0 cursor-pointer items-center gap-3 text-left"
                    aria-label="Go to home page"
                >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-900/10 transition-transform duration-300 group-hover:-translate-y-0.5">
                        <ShieldCheck className="size-6" strokeWidth={2.3} />
                    </span>

                    <span className="min-w-0">
                        <span className="block truncate text-base font-bold text-slate-900 sm:text-xl">
                            Political Science UBU
                        </span>
                        <span className="hidden text-xs font-medium text-slate-500 sm:block">
                            Van Reserving System
                        </span>
                    </span>
                </button>

                <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-4">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsProfileOpen((prev) => !prev)}
                            className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-left transition hover:border-emerald-200 hover:bg-emerald-50"
                            aria-haspopup="menu"
                            aria-expanded={isProfileOpen}
                        >
                            <span className="flex size-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                                <UserRound className="size-5" />
                            </span>
                            <div className="hidden max-w-48 leading-tight sm:block">
                                <span className="block text-xs font-semibold uppercase text-slate-400">
                                    Welcome
                                </span>
                                <p className="truncate text-sm font-bold text-slate-800">
                                    {displayName}
                                </p>
                            </div>
                            <ChevronDown
                                className={`size-4 text-slate-500 transition-transform ${
                                    isProfileOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        <div
                            className={`absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ${
                                isProfileOpen ? 'block' : 'hidden'
                            }`}
                            role="menu"
                        >
                            <button
                                type="button"
                                onClick={handleChangePassword}
                                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                                role="menuitem"
                            >
                                <UserPen size={18} />
                                Change Password
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full cursor-pointer items-center gap-3 border-t border-gray-100 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                role="menuitem"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MainNav;
