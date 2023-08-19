import { Dimensions, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

const { width, height } = Dimensions.get('screen');
const statusBarHeight = StatusBarManager.HEIGHT;

const ICON_SIZE = {
  I_20: 20,
  I_25: 25,
  I_30: 30,
};

export { width, height, statusBarHeight, ICON_SIZE };
