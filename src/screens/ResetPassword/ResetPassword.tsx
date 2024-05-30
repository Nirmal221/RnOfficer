import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import style from './style';
import { TextInputField } from '../../components';
import { AuthStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiConstant, post } from '../../services/ApiServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Context } from '../../AppContext/AppContext';

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ResetPassword'
>;

const ResetPassword = (props: LoginScreenProps) => {
  const { theme } = useContext(Context);
  const styles = style(theme === 'light');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const { navigation } = props;

  const onPressConfirm = async () => {
    const obj = {
      token: token,
      newPassword: password,
    };
    post(ApiConstant.RESET_PASSWORD, obj)
      .then(async () => {
        navigation.popToTop();
      })
      .catch(() => navigation.popToTop());
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInputField
          value={token}
          title={'Token'}
          placeholder="Please Enter Token"
          onChangeText={text => setToken(text)}
        />
        <TextInputField
          value={password}
          title={'Password'}
          placeholder="Please Enter New Password"
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity
          onPress={() => onPressConfirm()}
          activeOpacity={0.5}
          style={styles.loginButton}>
          <Text style={styles.loginTitle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
