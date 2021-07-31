import RNLocation from 'react-native-location';

export const locationConfig = async (): Promise<void> => {
  await RNLocation.configure({
    desiredAccuracy: {
      android: 'highAccuracy',
      ios: 'best',
    },
    allowsBackgroundLocationUpdates: true,
    pausesLocationUpdatesAutomatically: false,
  });
};
