import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async (): Promise<string | null | undefined> => {
  try {
    const value = await AsyncStorage.getItem('@user_details');
    if (value != null) {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch (e) {}
};
