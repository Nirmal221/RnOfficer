import React, { useContext, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { GOOGLE_WEB_CLIENT } from '../../services/GoogleLoginService';
import style from './style';
import { setInAsync } from '../../utils';
import { ASYNC_KEY } from '../../constant';
import { TextInputField } from '../../components';
import { StackActions } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Context } from '../../AppContext/AppContext';
import { AppIcons, AppImages } from '../../assets';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT,
});

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;

const LoginScreen = (props: LoginScreenProps) => {
  const { theme } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { navigation } = props;
  const styles = style(theme === 'light');

  const onPressLogin = async () => {
    const obj = {
      username: email,
      password: password,
    };
    await setInAsync(ASYNC_KEY.AUTH, JSON.stringify(obj));
    navigation.dispatch(StackActions.replace('AppStackScreens'));
    // post(ApiConstant.LOGIN, obj)
    //   .then(async () => {
    //     await setInAsync(ASYNC_KEY.AUTH, JSON.stringify(obj));
    //     navigation.dispatch(StackActions.replace('AppStackScreens'));
    //   })
    //   .catch(() => {
    //     Alert.alert('Something Went Wrong');
    //   });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Image
          source={AppImages.appLogo}
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            borderRadius: 100,
          }}
          resizeMode="contain"
        />
        <TextInputField
          value={email}
          title={'Email'}
          placeholder="Please Enter Email id"
          onChangeText={text => setEmail(text)}
        />
        <TextInputField
          secureTextEntry
          value={password}
          title={'Password'}
          placeholder="Please Enter Password"
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          disabled={email.length === 0 || password.length === 0}
          onPress={() => onPressLogin()}
          activeOpacity={0.5}
          style={styles.loginButton}>
          <Text style={styles.loginTitle}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          activeOpacity={0.5}
          style={styles.loginButton}>
          <Text style={styles.loginTitle}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TalukaRegistrationScreen', {})}
          activeOpacity={0.5}
          style={styles.loginButton}>
          <Text style={styles.loginTitle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
