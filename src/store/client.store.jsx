import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser } from '../api/userLogin';

const clientStore = (set) => ({
    user: null,
    actionLoginToGetUser: async (data) => {
        try {
            const res = await loginUser(data);
            console.log(res.data);
            set({ user: res.data });
        } catch (error) {
            console.log(error);
        }
    },
});
const useClientStore = create(
    persist(clientStore, {
        name: 'client-local-storage',
        partialize: ((state)=>{user: state.user})
    }),
);

export default useClientStore;
