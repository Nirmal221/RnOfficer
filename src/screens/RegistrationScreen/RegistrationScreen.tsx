import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  APP_CONSTANT,
  DESIGNATION,
  GENDER,
  MODAL_TYPE,
  STATUS,
} from '../../constant';
import {
  ActionButton,
  RenderPanel,
  SelectionModal,
  TextInputField,
} from '../../components';
import moment from 'moment';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import styles from './RegistrationScreen.style';
import { AuthStackParamList } from '../../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RegistrationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegistrationScreen'
>;

const RegistrationScreen = (props: RegistrationScreenProps) => {
  const { navigation, route } = props;
  const data = route.params.userData;

  // const data = {
  //   multiFactor: {
  //     enrolledFactors: [],
  //   },
  //   metadata: {
  //     lastSignInTime: 1689352746741,
  //     creationTime: 1689352746740,
  //   },
  //   photoURL:
  //     'https://lh3.googleusercontent.com/a/AAcHTtcSGzfWIh34UewkzkJW6SDYSb7p9WQ93psdjsnIRKg7Kska=s96-c',
  //   phoneNumber: null,
  //   tenantId: null,
  //   displayName: 'Gunjan Rupapara',
  //   emailVerified: true,
  //   isAnonymous: false,
  //   uid: 'xdRahuUqtFQNPfL5gJjfLqIVkHq2',
  //   email: 'gunjan87800@gmail.com',
  //   providerData: [
  //     {
  //       email: 'gunjan87800@gmail.com',
  //       providerId: 'google.com',
  //       photoURL:
  //         'https://lh3.googleusercontent.com/a/AAcHTtcSGzfWIh34UewkzkJW6SDYSb7p9WQ93psdjsnIRKg7Kska=s96-c',
  //       phoneNumber: null,
  //       displayName: 'Gunjan Rupapara',
  //       uid: '108759649820766826984',
  //     },
  //   ],
  //   providerId: 'firebase',
  // };
  const [profileImg, setProfileImg] = useState('');
  const [name, setName] = useState('');
  const [middalName, setMiddalName] = useState('');
  const [sureName, setSureName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  const [officeAddress, setOfficeAddress] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [officeDistrict, setOfficeDistrict] = useState('');
  const [nativeDistrict, setNativeDistrict] = useState('');
  const [remarks, setRemarks] = useState('');

  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedModalType, setSelectedModalType] = useState('');

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async () => {
    setName(data.displayName);
    setEmail(data.email);
    setProfileImg(data.photoURL);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDob(date);
    hideDatePicker();
  };

  const imageOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.2,
    presentationStyle: 'currentContext',
    includeBase64: true,
  };

  const onPressCameraIcon = () => {
    launchImageLibrary(imageOptions, async function (image) {
      if (!image || image.didCancel) {
      } else if (image.assets) {
        setProfileImg(`${image.assets[0].uri}`);
      }
    });
  };

  const genderSelection = (value: string) => {
    if (value === gender) {
      setGender('');
    } else {
      setGender(value);
    }
  };

  const statusSelection = (value: string) => {
    if (value === gender) {
      setStatus('');
    } else {
      setStatus(value);
    }
  };

  const handleSelection = (selected: any) => {
    if (selectedModalType === MODAL_TYPE.DESIGNATION) {
      setSelectedDesignation(selected);
    } else if (selectedModalType === MODAL_TYPE.OFFICE_DISTRICT) {
      setOfficeDistrict(selected);
    } else if (selectedModalType === MODAL_TYPE.NATIVE_DISTRICT) {
      setNativeDistrict(selected);
    }
  };

  const onPressCreateAccount = () => {
    const params = {
      name: name,
      middalName: middalName,
      sureName: sureName,
      gender: gender,
      dateOfBirth: dob,
      email: email,
      mobileNo: phoneNumber,
      officeAddress: officeAddress,
      designation: selectedDesignation,
      officeDistrict: officeDistrict,
      nativeDistrict: nativeDistrict,
    };
    navigation.navigate('AppStackScreens');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Registration</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: profileImg }}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={() => onPressCameraIcon()}>
              <AppIcons.Camera
                color={colors.secondary}
                height={25}
                width={25}
              />
            </TouchableOpacity>
          </View>
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

            <RenderPanel
              panelTitle="Gender"
              valueTextStyle={styles.dob}
              onPress={() => showDatePicker()}
            />
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={styles.genderContainer}
                onPress={() => {
                  genderSelection(GENDER.MALE);
                }}>
                <View
                  style={[
                    styles.radioBtn,
                    gender === GENDER.MALE && styles.selectedRadioBtn,
                  ]}
                />
                <Text>{APP_CONSTANT.MALE}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.genderContainer}
                onPress={() => {
                  genderSelection(GENDER.FEMALE);
                }}>
                <View
                  style={[
                    styles.radioBtn,
                    gender === GENDER.FEMALE && styles.selectedRadioBtn,
                  ]}
                />
                <Text>{APP_CONSTANT.FEMALE}</Text>
              </TouchableOpacity>
            </View>

            <RenderPanel
              panelTitle="Status*"
              valueTextStyle={styles.dob}
              onPress={() => showDatePicker()}
            />
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={styles.genderContainer}
                onPress={() => {
                  statusSelection(STATUS.CURRENT);
                }}>
                <View
                  style={[
                    styles.radioBtn,
                    status === STATUS.CURRENT && styles.selectedRadioBtn,
                  ]}
                />
                <Text>{APP_CONSTANT.CURRENT}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.genderContainer}
                onPress={() => {
                  statusSelection(STATUS.RETIRED);
                }}>
                <View
                  style={[
                    styles.radioBtn,
                    status === STATUS.RETIRED && styles.selectedRadioBtn,
                  ]}
                />
                <Text>{APP_CONSTANT.RETIRED}</Text>
              </TouchableOpacity>
            </View>

            <RenderPanel
              panelTitle="Date of Birth"
              value={moment(dob).format('DD/MM/YYYY')}
              valueTextStyle={styles.dob}
              onPress={() => showDatePicker()}
            />
            <TextInputField
              value={email}
              title={APP_CONSTANT.EMAIL}
              editable={false}
              placeholder={APP_CONSTANT.ENTER_EMAIL}
              onChangeText={text => setName(text)}
            />
            <TextInputField
              value={phoneNumber}
              title={APP_CONSTANT.MOBILE_NO}
              maxLength={10}
              keyboardType={'number-pad'}
              placeholder={APP_CONSTANT.ENTER_MOBILE_NO}
              onChangeText={text => setPhoneNumber(text)}
            />
            <TextInputField
              multiline
              value={officeAddress}
              title={APP_CONSTANT.OFFICE_ADDRESS}
              placeholder={APP_CONSTANT.ENTER_OFFICE_ADDRESS}
              onChangeText={text => setOfficeAddress(text)}
              textInputStyle={styles.ofcAddressTextInput}
            />
            <RenderPanel
              panelTitle="Designation"
              value={
                selectedDesignation.title
                  ? selectedDesignation.title
                  : 'Please Select Your Designation*'
              }
              valueTextStyle={styles.dob}
              onPress={() => {
                setShowSelectionModal(true);
                setSelectedModalType(MODAL_TYPE.DESIGNATION);
              }}
            />
            <RenderPanel
              panelTitle="Office District"
              value={
                officeDistrict.title
                  ? officeDistrict.title
                  : 'Please Select Office District *'
              }
              valueTextStyle={styles.dob}
              onPress={() => {
                setShowSelectionModal(true);
                setSelectedModalType(MODAL_TYPE.OFFICE_DISTRICT);
              }}
            />
            <RenderPanel
              panelTitle="Native District*"
              value={
                nativeDistrict.title
                  ? nativeDistrict.title
                  : 'Please Select Native District*'
              }
              valueTextStyle={styles.dob}
              onPress={() => {
                setShowSelectionModal(true);
                setSelectedModalType(MODAL_TYPE.NATIVE_DISTRICT);
              }}
            />
            <TextInputField
              multiline
              value={remarks}
              title={APP_CONSTANT.REMARKS}
              placeholder={APP_CONSTANT.PLEASE_ENTER_REMARKS}
              onChangeText={text => setRemarks(text)}
              textInputStyle={styles.ofcAddressTextInput}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionButton
        title={APP_CONSTANT.CREATE_ACCOUNT}
        onPress={() => onPressCreateAccount()}
        mainContainerStyle={styles.createBtnContainer}
      />
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
      {showSelectionModal && (
        <SelectionModal
          visible={showSelectionModal}
          data={DESIGNATION}
          onClose={() => setShowSelectionModal(false)}
          onSelect={selected => {
            setShowSelectionModal(false);
            handleSelection(selected);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default RegistrationScreen;
