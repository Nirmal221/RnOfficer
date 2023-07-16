import { Dimensions, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

const { width, height } = Dimensions.get('screen');
const statusBarHeight = StatusBarManager.HEIGHT;

export { width, height, statusBarHeight };
