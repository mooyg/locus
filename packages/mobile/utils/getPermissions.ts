import RNLocation from 'react-native-location';

export const getPermissions = async (): Promise<boolean> => {
  return await RNLocation.requestPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse', // or 'fine'
      rationale: {
        title: 'We need to access your location',
        message: 'We use your location to show where you are on the map',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    },
  });
};
