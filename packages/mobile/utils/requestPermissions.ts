import * as Location from 'expo-location';

export const checkLocationServices =
  async (): Promise<Location.LocationPermissionResponse> => {
    return await Location.requestForegroundPermissionsAsync();
  };
