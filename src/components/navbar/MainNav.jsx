import { useNavigate } from 'react-router';
import { LogOut, ShieldCheck, UserRound } from 'lucide-react';
import useClientStore from '../../store/client.store';

const MainNav = ({ name }) => {
    const navigate = useNavigate();
    const actionLogout = useClientStore((s) => s.actionLogout);
    const displayName = name || 'Guest User';

    const handleLogout = () => {
        try {
            actionLogout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-emerald-100/80 bg-white/90 shadow-sm backdrop-blur-xl">
            <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="group flex min-w-0 items-center gap-3 text-left"
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
                    <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
                        <span className="flex size-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                            <UserRound className="size-5" />
                        </span>
                        <div className="max-w-48 leading-tight">
                            <span className="block text-xs font-semibold uppercase text-slate-400">
                                Welcome
                            </span>
                            <p className="truncate text-sm font-bold text-slate-800">
                                {displayName}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-600 hover:text-white hover:shadow-md active:translate-y-0 sm:px-5"
                    >
                        <LogOut className="size-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default MainNav;
