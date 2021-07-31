import RNLocation from 'react-native-location';

export const checkPermissions = async (): Promise<boolean> => {
  return await RNLocation.checkPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse', // or 'fine'
    },
  });
};
