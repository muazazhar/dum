import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ user: user })),
}))

export { useUserStore }