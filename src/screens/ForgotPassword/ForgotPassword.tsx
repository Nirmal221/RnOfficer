import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import style from './style';
import { TextInputField } from '../../components';
import { Context } from '../../AppContext/AppContext';
import { AuthStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiConstant, post } from '../../services/ApiServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;

const ForgotPassword = (props: LoginScreenProps) => {
  const { theme } = useContext(Context);
  const styles = style(theme === 'light');
  const [email, setEmail] = useState('');
  const { navigation } = props;

  const onPressLogin = async () => {
    const obj = {
      email: email,
    };
    post(ApiConstant.FORGOT_PASSWORD, obj)
      .then(async () => {
        navigation.navigate('ResetPassword');
      })
      .catch(() => navigation.goBack());
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInputField
          value={email}
          title={'Email'}
          placeholder="Please Enter Email id"
          onChangeText={text => setEmail(text)}
        />

        <TouchableOpacity
          onPress={() => onPressLogin()}
          activeOpacity={0.5}
          style={styles.loginButton}>
          <Text style={styles.loginTitle}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
