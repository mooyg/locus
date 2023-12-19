import { LocationObject } from "expo-location";
import { create } from "zustand";

interface RealtimeLocationStore {
  realtimeLocation: LocationObject | null;
  setRealtimeLocation: (location: LocationObject) => void;
}
export const useRealtimeLocationStore = create<RealtimeLocationStore>(
  (set) => ({
    realtimeLocation: null,
    setRealtimeLocation: (location: LocationObject) =>
      set((state) => ({ ...state, realtimeLocation: location })),
  }),
);
