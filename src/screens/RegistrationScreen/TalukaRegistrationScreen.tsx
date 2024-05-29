import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Header,
  Loader,
  ActionButton,
  TextInputField,
  OfficerDetail,
} from '../../components';
import colors from '../../themes/Colors';
import BottomSheet from '@gorhom/bottom-sheet';
import { phoneNumberRegex } from '../../utils';
import { ApplicationStyle } from '../../themes';
import { ERROR, APP_CONSTANT } from '../../constant';
import { showError } from '../../components/ToastAlert';
import { SafeAreaView } from 'react-native-safe-area-context';

const TalukaRegistrationScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '85%'], []);

  const [name, setName] = useState('');
  const [middalName, setMiddalName] = useState('');
  const [sureName, setSureName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loader, setLoader] = useState(false);

  const checkPhoneNumberValid = () => {
    const check = phoneNumberRegex.test(phoneNumber);
    if (phoneNumber === '') {
      showError(ERROR.PLEASE_ENTER_PHONE_NUMBER);
      return true;
    } else if (!check) {
      showError(ERROR.PLEASE_ENTER_VALID_PHONE_NUMBER);
      return true;
    } else {
      return false;
    }
  };

  const checkValidation = () => {
    if (name === '') {
      showError(ERROR.PLEASE_ENTER_NAME);
      return false;
    } else if (middalName === '') {
      showError(ERROR.PLEASE_ENTER_MIDDAL_NAME);
      return false;
    } else if (sureName === '') {
      showError(ERROR.PLEASE_ENTER_SURE_NAME);
      return false;
    } else if (checkPhoneNumberValid()) {
      return false;
    } else {
      return true;
    }
  };

  const onPressCreateAccount = () => {
    if (checkValidation()) {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.expand();
      }
      const obj = {
        first_name: name,
        middal_name: middalName,
        last_name: sureName,
        mobile_number: phoneNumber,
      };

      //   setLoader(true);
      //   postWithFormData(ApiConstant.REGISTER, obj)
      //     .then(() => {
      //       setTimeout(() => {
      //         setLoader(false);
      //         navigation.goBack();
      //       }, 3000);
      //     })
      //     .catch(err => {
      //       const msgObj = err.response.data?.message;
      //       const msg = Object.keys(msgObj)[0];
      //       showError(msgObj[msg][0]);
      //     })

      //     .finally(() => {
      //       setLoader(false);
      //     });
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
          showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 50 }}>
            <TextInputField
              value={name}
              title={APP_CONSTANT.NAME}
              placeholder={APP_CONSTANT.ENTER_NAME}
              onChangeText={text => setName(text)}
            />
            <TextInputField
              value={middalName}
              title={APP_CONSTANT.MIDDAL_NAME}
              placeholder={APP_CONSTANT.ENTER_MIDDAL_NAME}
              onChangeText={text => setMiddalName(text)}
            />
            <TextInputField
              value={sureName}
              title={APP_CONSTANT.SURENAME}
              placeholder={APP_CONSTANT.ENTER_SURENAME}
              onChangeText={text => setSureName(text)}
            />
            <TextInputField
              value={phoneNumber}
              title={APP_CONSTANT.MOBILE_NO}
              maxLength={10}
              keyboardType={'number-pad'}
              placeholder={APP_CONSTANT.ENTER_MOBILE_NO}
              onChangeText={text => setPhoneNumber(text)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ActionButton
        title={APP_CONSTANT.CREATE_ACCOUNT}
        onPress={() => onPressCreateAccount()}
        mainContainerStyle={styles.createBtnContainer}
      />
      {loader && <Loader />}
      <OfficerDetail
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        selectedOfficer={{}}
      />
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
