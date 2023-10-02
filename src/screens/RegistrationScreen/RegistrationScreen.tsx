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
  DISTRICT,
  GENDER,
  MODAL_TYPE,
  STATUS,
  USER_PREFIX,
} from '../../constant';
import {
  ActionButton,
  Header,
  RenderPanel,
  SelectionModal,
  TextInputField,
} from '../../components';
import moment from 'moment';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import styles from './RegistrationScreen.style';
import { AuthStackParamList } from '../../navigation';
import { showError } from '../../components/ToastAlert';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RegistrationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegistrationScreen'
>;

type ListProps = {
  title?: string;
};

const RegistrationScreen = (props: RegistrationScreenProps) => {
  const { navigation, route } = props;
  const data = route.params?.userData;

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
  const [prefix, setPrefix] = useState(USER_PREFIX.MR);
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  const [officeAddress, setOfficeAddress] = useState('');
  const [designationList, setDesignationList] = useState(DESIGNATION);
  const [selectedDesignation, setSelectedDesignation] = useState<ListProps>({});
  const [ofcDistrictList, setOfcDistrictList] = useState(DISTRICT);
  const [selectedOfficeDistrict, setSelectedOfficeDistrict] =
    useState<ListProps>({});
  const [nativeDistrictList, setNativeDistrictList] = useState(DISTRICT);
  const [selectedNativeDistrict, setSelectedNativeDistrict] =
    useState<ListProps>({});
  const [remarks, setRemarks] = useState('');

  const [selectionTitle, setSelectionTitle] = useState('');
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedModalType, setSelectedModalType] = useState('');

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async () => {
    setName(data.displayName.split(' ')[0] ?? '');
    setSureName(data.displayName.split(' ')[1] ?? '');
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
      setSelectedOfficeDistrict(selected);
    } else if (selectedModalType === MODAL_TYPE.NATIVE_DISTRICT) {
      setSelectedNativeDistrict(selected);
    }
  };

  const checkValidation = () => {
    if (name === '') {
      showError('Error', 'Enter name');
      return false;
    } else if (middalName === '') {
      showError('Error', 'Enter MiddalName');
      return false;
    } else if (sureName === '') {
      showError('Error', 'Enter SureName');
      return false;
    } else if (phoneNumber === '') {
      showError('Error', 'Enter Phone Number');
      return false;
    } else if (officeAddress === '') {
      showError('Error', 'Enter OfficeAddress');
      return false;
    } else if (Object.keys(selectedDesignation).length === 0) {
      showError('Error', 'Please Select Your Designation');
      return false;
    } else if (Object.keys(officeAddress).length === 0) {
      showError('Error', 'Please Select Your Office Address');
      return false;
    } else if (Object.keys(selectedNativeDistrict).length === 0) {
      showError('Error', 'Please Select Your Native District');
      return false;
    } else if (remarks === '') {
      showError('Error', 'Enter remarks');
      return false;
    } else {
      return true;
    }
  };

  const onPressCreateAccount = () => {
    if (checkValidation()) {
      const params = {
        name: name,
        middalName: middalName,
        sureName: sureName,
        prefix: prefix,
        gender: gender,
        dateOfBirth: dob,
        email: email,
        mobileNo: phoneNumber,
        officeAddress: officeAddress,
        designation: selectedDesignation,
        selectedOfficeDistrict: selectedOfficeDistrict,
        selectedNativeDistrict: selectedNativeDistrict,
      };
      console.log('params--->,', params);

      // navigation.navigate('AppStackScreens');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['bottom']}>
      <Header title="Registration" />
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
              panelTitle={APP_CONSTANT.PREFIX}
              valueTextStyle={styles.panelValue}
              mainContainerStyle={styles.pT50}
            />
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={styles.optionTouchableContainer}
                onPress={() => setPrefix(USER_PREFIX.DR)}>
                {prefix === USER_PREFIX.DR ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.DR}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouchableContainer}
                onPress={() => setPrefix(USER_PREFIX.MR)}>
                {prefix === USER_PREFIX.MR ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.MR}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={styles.optionTouchableContainer}
                onPress={() => setPrefix(USER_PREFIX.MS)}>
                {prefix === USER_PREFIX.MS ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.MS}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouchableContainer}
                onPress={() => setPrefix(USER_PREFIX.MRS)}>
                {prefix === USER_PREFIX.MRS ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.MRS}</Text>
              </TouchableOpacity>
            </View>

            <RenderPanel
              panelTitle={APP_CONSTANT.GENDER}
              valueTextStyle={{ ...styles.panelValue }}
              mainContainerStyle={styles.pT50}
            />
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={styles.optionTouchableContainer}
                onPress={() => genderSelection(GENDER.MALE)}>
                {gender === GENDER.MALE ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.MALE}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouchableContainer}
                onPress={() => genderSelection(GENDER.FEMALE)}>
                {gender === GENDER.FEMALE ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.FEMALE}</Text>
              </TouchableOpacity>
            </View>

            <RenderPanel
              panelTitle={APP_CONSTANT.STATUS}
              valueTextStyle={styles.panelValue}
              mainContainerStyle={styles.pT50}
            />
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={styles.optionTouchableContainer}
                onPress={() => statusSelection(STATUS.CURRENT)}>
                {status === STATUS.CURRENT ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.CURRENT}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouchableContainer}
                onPress={() => statusSelection(STATUS.RETIRED)}>
                {status === STATUS.RETIRED ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.RETIRED}</Text>
              </TouchableOpacity>
            </View>

            <RenderPanel
              panelTitle={APP_CONSTANT.DOB}
              value={moment(dob).format('DD/MM/YYYY')}
              valueTextStyle={styles.panelValue}
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
              panelTitle={APP_CONSTANT.DESIGNATION}
              value={
                selectedDesignation?.title
                  ? selectedDesignation?.title
                  : APP_CONSTANT.DESIGNATION_PLACEHOLDER
              }
              valueTextStyle={styles.panelValue}
              onPress={() => {
                setShowSelectionModal(true);
                setSelectionTitle(APP_CONSTANT.DESIGNATION);
                setSelectedModalType(MODAL_TYPE.DESIGNATION);
              }}
            />
            <RenderPanel
              panelTitle={APP_CONSTANT.OFFICE_DISTRICT}
              value={
                selectedOfficeDistrict?.title
                  ? selectedOfficeDistrict?.title
                  : APP_CONSTANT.OFFICE_DISTRICT_PLACEHOLDER
              }
              valueTextStyle={styles.panelValue}
              onPress={() => {
                setShowSelectionModal(true);
                setSelectionTitle(APP_CONSTANT.OFFICE_DISTRICT);
                setSelectedModalType(MODAL_TYPE.OFFICE_DISTRICT);
              }}
            />
            <RenderPanel
              panelTitle={APP_CONSTANT.NATIVE_DISTRICT}
              value={
                selectedNativeDistrict.title
                  ? selectedNativeDistrict.title
                  : APP_CONSTANT.NATIVE_DISTRICT_PLACEHOLDER
              }
              valueTextStyle={styles.panelValue}
              onPress={() => {
                setShowSelectionModal(true);
                setSelectionTitle(APP_CONSTANT.NATIVE_DISTRICT);
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
          title={selectionTitle}
          visible={showSelectionModal}
          data={
            selectedModalType === MODAL_TYPE.DESIGNATION
              ? designationList
              : selectedModalType === MODAL_TYPE.NATIVE_DISTRICT
              ? nativeDistrictList
              : selectedModalType === MODAL_TYPE.OFFICE_DISTRICT
              ? ofcDistrictList
              : []
          }
          onClose={() => setShowSelectionModal(false)}
          onSelect={selected => {
            setShowSelectionModal(false);
            handleSelection(selected);
          }}
          onSearch={searchText => {
            if (selectedModalType === MODAL_TYPE.DESIGNATION) {
              const filter = DESIGNATION.filter(e =>
                e.title
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase()),
              );
              setDesignationList(filter);
            } else if (selectedModalType === MODAL_TYPE.NATIVE_DISTRICT) {
              const filter = DISTRICT.filter(e =>
                e.title
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase()),
              );
              setNativeDistrictList(filter);
            } else if (selectedModalType === MODAL_TYPE.OFFICE_DISTRICT) {
              const filter = DISTRICT.filter(e =>
                e.title
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase()),
              );
              setOfcDistrictList(filter);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default RegistrationScreen;
