import RNLocation from 'react-native-location';

export const subscribeLocation = () => {
  const unsubscribe = RNLocation.subscribeToLocationUpdates((locations) => {});
};
