import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { loginUser } from '../api/userLogin';

const clientStore = (set) => ({
    user: null,
    token: null,
    actionLoginToGetUser: async (data) => {
        try {
            const res = await loginUser(data);
            set({ user: res.data.payload, token: res.data.token });
        } catch (error) {
            console.log(error);
        }
    },
    actionClearToken: () => set({ token: null }),
});

const usePersist = {
    name: "client-local-storage'",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        user: state.user,
        token: state.token,
    }),
};

const useClientStore = create(persist(clientStore, usePersist));

export default useClientStore;
