import AsyncStorage from '@react-native-async-storage/async-storage';

const phoneNumberRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

const setInAsync = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, data);
};
const getFromAsync = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export { setInAsync, getFromAsync, phoneNumberRegex };
