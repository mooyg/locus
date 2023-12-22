import { LocationObject } from "expo-location"
import { create } from "zustand"

interface RealtimeLocationStore {
	realtimeLocation: LocationObject | null
	setRealtimeLocation: (location: LocationObject) => void
}
type User = {
	id: string
	familyId: string
}
interface UserStore {
	user: User | null
	setUser: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (user: User) => set((state) => ({ ...state, user })),
}))

export const useRealtimeLocationStore = create<RealtimeLocationStore>((set) => ({
	realtimeLocation: null,
	setRealtimeLocation: (location: LocationObject) =>
		set((state) => ({ ...state, realtimeLocation: location })),
}))
