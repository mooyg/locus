import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (
  key: string
): Promise<string | null | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch (e) {}
};
