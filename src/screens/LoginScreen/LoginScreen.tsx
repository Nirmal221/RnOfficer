import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  GOOGLE_WEB_CLIENT,
  handleGoogleLogin,
} from '../../services/GoogleLoginService';
import { setInAsync } from '../../utils';
import { AppImages } from '../../assets';
import { ASYNC_KEY } from '../../constant';
import { height, width } from '../../themes';
import { AuthStackParamList } from '../../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import colors from '../../themes/Colors';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT,
});

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;

const LoginScreen = (props: LoginScreenProps) => {
  const { navigation } = props;
  // const navigation = useNavigation();
  const onPressGoogleLogin = () => {
    handleGoogleLogin().then(async res => {
      handleLogiUserData(res);
    });
  };

  const handleLogiUserData = (userData: any) => {
    // await setInAsync(ASYNC_KEY.AUTH, JSON.stringify(res.user));
    navigation.navigate('RegistrationScreen', { userData: userData.user });
    // navigation.dispatch(StackActions.replace('AppStackScreens'));
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  googleLogo: {
    marginRight: 5,
    height: 30,
    width: 30,
  },
});

export default LoginScreen;
