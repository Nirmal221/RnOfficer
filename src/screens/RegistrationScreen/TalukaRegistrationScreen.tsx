import React, { useState } from 'react';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import colors from '../../themes/Colors';
import { ApplicationStyle } from '../../themes';
import { ERROR, APP_CONSTANT } from '../../constant';
import { showError } from '../../components/ToastAlert';
import { AuthStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiConstant, post } from '../../services/ApiServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header, Loader, ActionButton, TextInputField } from '../../components';

type TalukaRegistrationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'TalukaRegistrationScreen'
>;

const TalukaRegistrationScreen = (props: TalukaRegistrationScreenProps) => {
  const { navigation } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loader, setLoader] = useState(false);

  const checkValidation = () => {
    if (name === '') {
      showError(ERROR.PLEASE_ENTER_NAME);
      return false;
    } else {
      return true;
    }
  };

  const onPressCreateAccount = () => {
    if (checkValidation()) {
      const obj = {
        username: name,
        email: email,
        password: password,
      };

      // setLoader(true);
      post(ApiConstant.REGISTER, obj)
        .then(() => {
          setTimeout(() => {
            setLoader(false);
            Alert.alert('Register Successfully');
            navigation.goBack();
          }, 3000);
        })
        .catch(err => {
          const msgObj = err.response.data?.message;
          const msg = Object.keys(msgObj)[0];
          showError(msgObj[msg][0]);
        })

        .finally(() => {
          setLoader(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['bottom']}>
      <Header title={APP_CONSTANT.REGISTRATION} showLeftArrow={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}
          showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 50 }}>
            <TextInputField
              value={name}
              title={APP_CONSTANT.NAME}
              placeholder={'Please Enter Your Full Name'}
              onChangeText={text => setName(text)}
            />
            <TextInputField
              value={email}
              title={APP_CONSTANT.EMAIL}
              placeholder={'Please Enter Your Email  '}
              onChangeText={text => setEmail(text)}
            />
            <TextInputField
              value={password}
              title={'Password'}
              placeholder={'Please Enter Your Password'}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <ActionButton
            title={APP_CONSTANT.CREATE_ACCOUNT}
            onPress={() => onPressCreateAccount()}
            mainContainerStyle={styles.createBtnContainer}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {loader && <Loader />}
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
    paddingHorizontal: 15,
    backgroundColor: colors.secondary,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  imgContainer: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
  },
  profileImg: { height: 100, width: 100, borderRadius: 10 },
  panelValue: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  pT50: { paddingVertical: 0, paddingTop: 10 },
  cameraIcon: {
    position: 'absolute',
    height: 25,
    width: 25,
    bottom: 2.5,
    right: 5,
  },
  selectionContainer: {
    marginTop: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    ...ApplicationStyle.rowAlignCenter,
    justifyContent: 'space-between',
  },
  optionTouchableContainer: {
    width: '50%',
    ...ApplicationStyle.rowAlignCenter,
  },
  threeSmallOptionList: {
    width: '33%',
  },
  fourSmallOptionList: {
    width: '25%',
  },
  ofcAddressTextInput: {
    maxHeight: 250,
    textAlignVertical: 'top',
    paddingTop: 5,
  },
  createBtnContainer: {
    marginHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 15,
    backgroundColor: colors.black,
  },
  optionTitle: {
    paddingLeft: 5,
    paddingTop: 2,
    ...ApplicationStyle.f14w400,
  },
  uploadIdContainer: {
    height: 100,
    width: 100,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  uploadIdTitle: {
    textAlign: 'center',
    color: colors.grey,
    ...ApplicationStyle.f15w500,
  },
  officerImg: { height: 100, width: 100, borderRadius: 10, marginVertical: 10 },
  otherUploadImgContainer: { alignSelf: 'flex-start' },
  otherCameraIcon: { bottom: 15 },
});

export default TalukaRegistrationScreen;
