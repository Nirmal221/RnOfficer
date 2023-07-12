import React from 'react';
import AppImages from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GOOGLE_WEB_CLIENT,
  handleGoogleLogin,
} from '../../services/GoogleLoginService';
import { StackActions, useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const onPressGoogleLogin = () => {
    handleGoogleLogin()
      .then(() => {
        navigation.dispatch(StackActions.replace('AppStackScreens'));
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onPressGoogleLogin()}
          activeOpacity={0.5}
          style={styles.loginButton}>
          <Image source={AppImages.google} style={styles.googleLogo} />
          <Text>Login With Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
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
