import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser } from '../api/userLogin';

const clientStore = (set) => ({
    user: null,
    token: null,
    actionLoginToGetUser: async (data) => {
        try {
            const res = await loginUser(data);
            console.log(res.data);
            set({ user: res.data });
            set({token: res.data.token});
        } catch (error) {
            console.log(error);
        }
    },
    actionClearToken: () => set({ token: null }),
});

const useClientStore = create(
    persist(clientStore, {
        name: 'client-local-storage',
        partialize: (state) => ({
            user: state.user,
            token: state.toke,
        }),
    }),
);

export default useClientStore;
