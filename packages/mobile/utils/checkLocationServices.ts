import * as Location from 'expo-location';
export const checkLocationServices = async (): Promise<boolean> => {
  return await Location.hasServicesEnabledAsync();
};
