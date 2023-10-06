import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  GOOGLE_WEB_CLIENT,
  handleGoogleLogin,
} from '../../services/GoogleLoginService';
import styles from './style';
import { AppImages } from '../../assets';
import { setInAsync } from '../../utils';
import { ASYNC_KEY } from '../../constant';
import { height, width } from '../../themes';
import { AuthStackParamList } from '../../navigation';
import { showError } from '../../components/ToastAlert';
import { postCheckUser } from '../../services/ApiServices';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const onPressGoogleLogin = () => {
    handleGoogleLogin().then(async res => {
      checkAlreadyUser(res);
    });
  };

  const checkAlreadyUser = (data: any) => {
    const url = 'https://patidarkarmyogi.saranginfotech.in/api/login';
    console.log(data);

    postCheckUser(url, data.user.uid, data.user.email)
      .then(async (res: any) => {
        await setInAsync(ASYNC_KEY.AUTH, JSON.stringify(res.data.data.data));
        navigation.dispatch(StackActions.replace('AppStackScreens'));
      })
      .catch(err => {
        const msg = err.response.data.message.error;
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
        <Image
          source={AppImages.onBoard}
          style={{ width: width, height: height * 0.5 }}
          resizeMode="contain"
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
          <Text>Login With Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
