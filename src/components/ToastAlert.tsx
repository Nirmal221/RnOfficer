import React from 'react';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';
import { Text, View } from 'react-native';
import { APP_CONSTANT } from '../constant';

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const ToastAlert: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text1NumberOfLines={1}
      text2NumberOfLines={2}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  tomatoToast: (props): React.JSX.Element => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text numberOfLines={2}>{props.text1}</Text>
    </View>
  ),
};

const showSuccess = (header: string, message: string) => {
  Toast.show({
    type: TOAST_TYPE.SUCCESS,
    text1: header,
    text2: message,
    position: 'bottom',
  });
};

const showError = (message: string) => {
  Toast.show({
    type: TOAST_TYPE.ERROR,
    text1: APP_CONSTANT.WARNING,
    text2: message,
    position: 'bottom',
  });
};

export { ToastAlert, showSuccess, showError };
