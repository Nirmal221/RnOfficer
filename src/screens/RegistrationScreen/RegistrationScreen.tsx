import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
  ASYNC_KEY,
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
import { phoneNumberRegex, setInAsync } from '../../utils';
import styles from './RegistrationScreen.style';
import { AuthStackParamList } from '../../navigation';
import { showError } from '../../components/ToastAlert';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  get,
  post,
  postCheckUser,
  postWithFormData,
} from '../../services/ApiServices';
import { UserDataObject } from './types';
import { StackActions } from '@react-navigation/native';
import { height, width } from '../../themes';

type RegistrationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegistrationScreen'
>;

type ListProps = {
  id?: number;
  name?: string;
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
  const [selectedDesignation, setSelectedDesignation] = useState<ListProps>({});
  const [selectedOfficeDistrict, setSelectedOfficeDistrict] =
    useState<ListProps>({});
  const [selectedNativeDistrict, setSelectedNativeDistrict] =
    useState<ListProps>({});
  const [remarks, setRemarks] = useState('');

  const [selectionTitle, setSelectionTitle] = useState('');
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedModalType, setSelectedModalType] = useState('');
  const [officerIdImg, setOfficerIdImg] = useState<string>('');
  const [leavingCertiImg, setLeavingCertiImg] = useState<string>('');

  const [designationList, setDesignationList] = useState([]);
  const [ofcDistrictList, setOfcDistrictList] = useState([]);
  const [nativeDistrictList, setNativeDistrictList] = useState(DISTRICT);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getDistrict();
    getUserData();
    getDesignation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDistrict = () => {
    get('https://patidarkarmyogi.saranginfotech.in/api/districts')
      .then(res => {
        setOfcDistrictList(res?.data?.data);
        setNativeDistrictList(res?.data?.data);
        setNativeDistrictList(res?.data?.data);
      })
      .catch(() => null);
  };

  const getDesignation = () => {
    get('https://patidarkarmyogi.saranginfotech.in/api/designations')
      .then(res => {
        setDesignationList(res?.data?.data);
      })
      .catch(() => null);
  };

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

  const onPressUploadIdButton = () => {
    launchImageLibrary(imageOptions, async function (image) {
      if (!image || image.didCancel) {
      } else if (image.assets) {
        var uri = image.assets[0].uri;
        setOfficerIdImg(uri);
      }
    });
  };

  const onPressLeavingCertiButton = () => {
    launchImageLibrary(imageOptions, async function (image) {
      if (!image || image.didCancel) {
      } else if (image.assets) {
        var uri = image.assets[0].uri;
        setLeavingCertiImg(uri);
      }
    });
  };

  const checkPhoneNumberValid = () => {
    const check = phoneNumberRegex.test(phoneNumber);
    if (phoneNumber === '') {
      showError('Error', 'Enter Phone Number');
      return true;
    } else if (!check) {
      showError('Error', 'Enter Valid Phone Number');
      return true;
    } else {
      return false;
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
    } else if (checkPhoneNumberValid()) {
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
    }
    //  else if (remarks === '') {
    //   showError('Error', 'Enter remarks');
    //   return false;
    // }
    else {
      return true;
    }
  };

  const onPressCreateAccount = () => {
    if (checkValidation()) {
      const obj: UserDataObject = {
        photo: profileImg,
        google_id: data.uid,
        prefix: prefix,
        first_name: name,
        middal_name: middalName,
        last_name: sureName,
        email: email,
        mobile_number: Number(phoneNumber),
        designation_id: Number(selectedDesignation.id),
        job_status: status === STATUS.CURRENT ? 'Current' : 'Retired',
        office_address: officeAddress,
        office_district_id: Number(selectedOfficeDistrict.id),
        native_district_id: Number(selectedNativeDistrict.id),
        office_id_photo: officerIdImg,
        leaving_certificate_photo: leavingCertiImg,
      };
      console.log('obj---->', obj);

      setLoader(true);
      const url = 'https://patidarkarmyogi.saranginfotech.in/api/register';
      postWithFormData(url, obj)
        .then(async res => {
          setTimeout(() => {
            checkAlreadyUser(res.data.data.data);
          }, 3000);
          // await setInAsync(ASYNC_KEY.AUTH, JSON.stringify(res.data.data.data));
          // navigation.dispatch(StackActions.replace('AppStackScreens'));
        })
        .catch(err => {
          showError('Error', 'SomeThing Went Wrong');
          setLoader(false);
        })
        .finally(() => {});
    }
  };

  const checkAlreadyUser = data => {
    const url = 'https://patidarkarmyogi.saranginfotech.in/api/login';
    console.log(data);

    postCheckUser(url, data.google_id, data.email)
      .then(res => {
        console.log('test----->res', res);
      })
      .catch(err => {
        console.log('err--->', err.response.data);
        navigation.goBack();
      })
      .finally(() => {
        setLoader(false);
      });
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
                selectedDesignation?.name
                  ? selectedDesignation?.name
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
                selectedOfficeDistrict?.name
                  ? selectedOfficeDistrict?.name
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
                selectedNativeDistrict.name
                  ? selectedNativeDistrict.name
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
            {officerIdImg.length === 0 ? (
              <TouchableOpacity
                style={styles.uploadIdContainer}
                onPress={() => onPressUploadIdButton()}>
                <Text style={styles.uploadIdTitle}>
                  {APP_CONSTANT.UPLOAD_OFFICER_ID}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.otherUploadImgContainer}>
                <Image
                  source={{ uri: officerIdImg }}
                  style={styles.officerImg}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={[styles.cameraIcon, styles.otherCameraIcon]}
                  onPress={() => onPressUploadIdButton()}>
                  <AppIcons.Camera
                    color={colors.secondary}
                    height={25}
                    width={25}
                  />
                </TouchableOpacity>
              </View>
            )}
            {leavingCertiImg.length === 0 ? (
              <TouchableOpacity
                style={styles.uploadIdContainer}
                onPress={() => onPressLeavingCertiButton()}>
                <Text style={styles.uploadIdTitle}>
                  {APP_CONSTANT.UPLOAD_LEAVING_CERTI}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.otherUploadImgContainer}>
                <Image
                  source={{ uri: leavingCertiImg }}
                  style={styles.officerImg}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={[styles.cameraIcon, styles.otherCameraIcon]}
                  onPress={() => onPressLeavingCertiButton()}>
                  <AppIcons.Camera
                    color={colors.secondary}
                    height={25}
                    width={25}
                  />
                </TouchableOpacity>
              </View>
            )}
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
      {loader && (
        <View
          style={{
            position: 'absolute',
            height: height,
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ActivityIndicator color={colors.secondary} size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default RegistrationScreen;
