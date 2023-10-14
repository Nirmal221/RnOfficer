import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {
  GOOGLE_WEB_CLIENT,
  handleGoogleLogin,
} from '../../services/GoogleLoginService';
import styles from './style';
import { AppIcons, AppImages } from '../../assets';
import { setInAsync } from '../../utils';
import { ASYNC_KEY } from '../../constant';
import { colors, height, width } from '../../themes';
import { showError } from '../../components/ToastAlert';
import { StackActions } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiConstant, postCheckUser } from '../../services/ApiServices';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT,
});

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;

const LoginScreen = (props: LoginScreenProps) => {
  const { navigation } = props;
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const onPressGoogleLogin = () => {
    handleGoogleLogin().then(async res => {
      checkAlreadyUser(res);
    });
  };

  const checkAlreadyUser = (data: any) => {
    const googleId = data.user.uid;
    const emailId = data.user.email;
    postCheckUser(ApiConstant.LOGIN, googleId, emailId)
      .then(async (res: any) => {
        await setInAsync(ASYNC_KEY.AUTH, JSON.stringify(res?.data?.data?.data));
        navigation.dispatch(StackActions.replace('AppStackScreens'));
      })
      .catch(err => {
        const msg = err?.response?.data?.message?.error;
        if (msg === 'Unauthorised') {
          navigation.navigate('RegistrationScreen', {
            userData: data.user,
          });
        } else {
          showError(msg);
        }
      })
      .finally(() => {});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <AppIcons.AppLogo
          height={height * 0.5}
          width={width}
          color={isDark ? colors.grey : colors.black}
        />
        <TouchableOpacity
          onPress={() => onPressGoogleLogin()}
          activeOpacity={0.5}
          style={styles.loginButton}>
          <Image
            source={AppImages.google}
            style={styles.googleLogo}
            resizeMode="contain"
          />
          <Text style={styles.loginTitle}>Login With Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
