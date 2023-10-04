import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import { getFromAsync } from '../../utils';
import { ASYNC_KEY } from '../../constant';
import { StackActions } from '@react-navigation/routers';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RegistrationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = ({ navigation }: RegistrationScreenProps) => {
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const user = await getFromAsync(ASYNC_KEY.AUTH);
    if (user) {
      navigation.dispatch(StackActions.replace('AppStackScreens'));
    } else {
      navigation.dispatch(StackActions.replace('AuthStack'));
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default SplashScreen;
