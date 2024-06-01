import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import { StackActions } from '@react-navigation/routers';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getFromAsync } from '../../utils';
import { ASYNC_KEY } from '../../constant';
import { AppImages } from '../../assets';

type RegistrationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = ({ navigation }: RegistrationScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      checkAuth();
    }, 1000);
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
    </View>
  );
};

export default SplashScreen;
