import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: unknown, key: string) => {
  console.log(typeof value);
  if (typeof value === 'object') {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {}
  } else if (typeof value === 'string') {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  }
};
