import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { getFromAsync } from '../../utils';
import { ASYNC_KEY } from '../../constant';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { StackActions } from '@react-navigation/routers';

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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
