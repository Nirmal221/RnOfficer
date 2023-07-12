import AsyncStorage from '@react-native-async-storage/async-storage';

const setInAsync = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, data);
};
const getFromAsync = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export { setInAsync, getFromAsync };
