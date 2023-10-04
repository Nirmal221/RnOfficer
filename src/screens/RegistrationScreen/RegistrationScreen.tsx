import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  STATUS,
  GENDER,
  MODAL_TYPE,
  USER_PREFIX,
  DESIGNATION,
  APP_CONSTANT,
  MARITAL_STATUS,
  OFFICER_CLASS,
} from '../../constant';
import {
  Header,
  Loader,
  RenderPanel,
  ActionButton,
  SelectionModal,
  TextInputField,
} from '../../components';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  AuthStackParamList,
  DistrictsObject,
  UserData,
} from '../../navigation/types';
import moment from 'moment';
import styles from './styles';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import { phoneNumberRegex } from '../../utils';
import { showError } from '../../components/ToastAlert';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApiConstant, get, postWithFormData } from '../../services/ApiServices';

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

  const [profileImg, setProfileImg] = useState('');
  const [name, setName] = useState('');
  const [middalName, setMiddalName] = useState('');
  const [sureName, setSureName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alterPhoneNumber, setAlterPhoneNumber] = useState('');
  const [dob, setDob] = useState(new Date());
  const [prefix, setPrefix] = useState(USER_PREFIX.MR);
  const [gender, setGender] = useState(GENDER.MALE);
  const [status, setStatus] = useState(STATUS.CURRENT);
  const [marritalStatus, setMarritalStatus] = useState(
    MARITAL_STATUS.UN_MARRIED,
  );

  const [officeAddress, setOfficeAddress] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState<ListProps>({});
  const [officerClass, setofficerClass] = useState(OFFICER_CLASS.ONE);
  const [selectedOfficeDistrict, setSelectedOfficeDistrict] =
    useState<ListProps>({});
  const [specelization, setSpecelization] = useState('');
  const [nativeAddress, setNativeAddress] = useState('');
  const [referenceBy, setReferenceBy] = useState('');
  const [selectedNativeDistrict, setSelectedNativeDistrict] =
    useState<ListProps>({});
  const [remarks, setRemarks] = useState('');

  const [selectionTitle, setSelectionTitle] = useState('');
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedModalType, setSelectedModalType] = useState('');
  const [officerIdImg, setOfficerIdImg] = useState<string>('');
  const [leavingCertiImg, setLeavingCertiImg] = useState<string>('');

  const [designationList, setDesignationList] = useState<Array<object>>([]);
  const [districtList, setDistrictList] = useState<Array<DistrictsObject>>([]);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getDistrict();
    getUserData();
    getDesignation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDistrict = () => {
    get(ApiConstant.DISTRICTS)
      .then((res: any) => {
        const arr = res?.data?.data.sort(
          (a: DistrictsObject, b: DistrictsObject) =>
            a.name.localeCompare(b.name),
        );
        setDistrictList(arr);
      })
      .catch(() => null);
  };

  const getDesignation = () => {
    get(ApiConstant.DESIGNATIONS)
      .then((res: any) => {
        const arr = res?.data?.data.sort(
          (a: DistrictsObject, b: DistrictsObject) =>
            a.name.localeCompare(b.name),
        );

        setDesignationList(arr);
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
    launchImageLibrary(
      imageOptions,
      async function (image: ImagePickerResponse) {
        if (!image || image.didCancel) {
        } else if (image.assets) {
          var uri = image?.assets[0]?.uri;
          if (uri) {
            setOfficerIdImg(uri);
          }
        }
      },
    );
  };

  const onPressLeavingCertiButton = () => {
    launchImageLibrary(imageOptions, async function (image) {
      if (!image || image.didCancel) {
      } else if (image.assets) {
        var uri = image.assets[0].uri;
        if (uri) {
          setLeavingCertiImg(uri);
        }
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
    } else {
      return true;
    }
  };

  const onPressCreateAccount = () => {
    if (checkValidation()) {
      const obj: UserData = {
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
      setLoader(true);
      postWithFormData(ApiConstant.REGISTER, obj)
        .then(() => {
          setTimeout(() => {
            setLoader(false);
            navigation.goBack();
          }, 3000);
        })
        .catch(() => {
          showError('Error', 'SomeThing Went Wrong');
          setLoader(false);
        })
        .finally(() => {});
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
                onPress={() => setPrefix(USER_PREFIX.MISS)}>
                {prefix === USER_PREFIX.MISS ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.MISS}</Text>
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
              panelTitle={APP_CONSTANT.MARITAL_STATUS}
              valueTextStyle={{ ...styles.panelValue }}
              mainContainerStyle={styles.pT50}
            />
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.threeSmallOptionList,
                ]}
                onPress={() => setMarritalStatus(MARITAL_STATUS.MARRIED)}>
                {marritalStatus === MARITAL_STATUS.MARRIED ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.MARRIED}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.threeSmallOptionList,
                ]}
                onPress={() => setMarritalStatus(MARITAL_STATUS.UN_MARRIED)}>
                {marritalStatus === MARITAL_STATUS.UN_MARRIED ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>
                  {APP_CONSTANT.UN_MARRIED}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.threeSmallOptionList,
                ]}
                onPress={() => setMarritalStatus(MARITAL_STATUS.WIDOW)}>
                {marritalStatus === MARITAL_STATUS.WIDOW ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.WIDOW}</Text>
              </TouchableOpacity>
            </View>

            <RenderPanel
              panelTitle={APP_CONSTANT.JOB_STATUS}
              valueTextStyle={styles.panelValue}
              mainContainerStyle={styles.pT50}
            />
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.threeSmallOptionList,
                ]}
                onPress={() => statusSelection(STATUS.CURRENT)}>
                {status === STATUS.CURRENT ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.CURRENT}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.threeSmallOptionList,
                ]}
                onPress={() => statusSelection(STATUS.RETIRED)}>
                {status === STATUS.RETIRED ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.RETIRED}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.threeSmallOptionList,
                ]}
                onPress={() => statusSelection(STATUS.VRS)}>
                {status === STATUS.VRS ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.VRS}</Text>
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
              value={alterPhoneNumber}
              title={APP_CONSTANT.MOBILE_NO}
              maxLength={10}
              keyboardType={'number-pad'}
              placeholder={APP_CONSTANT.ENTER_MOBILE_NO}
              onChangeText={text => setAlterPhoneNumber(text)}
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
            <TextInputField
              multiline
              value={officeAddress}
              title={APP_CONSTANT.OFFICE_ADDRESS}
              placeholder={APP_CONSTANT.ENTER_OFFICE_ADDRESS}
              onChangeText={text => setOfficeAddress(text)}
              textInputStyle={styles.ofcAddressTextInput}
            />
            <RenderPanel
              panelTitle={APP_CONSTANT.CLASS}
              valueTextStyle={styles.panelValue}
              mainContainerStyle={styles.pT50}
            />
            <View style={styles.selectionContainer}>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.fourSmallOptionList,
                ]}
                onPress={() => setofficerClass(OFFICER_CLASS.ONE)}>
                {officerClass === OFFICER_CLASS.ONE ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.ONE}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.fourSmallOptionList,
                ]}
                onPress={() => setofficerClass(OFFICER_CLASS.TWO)}>
                {officerClass === OFFICER_CLASS.TWO ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.TWO}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.fourSmallOptionList,
                ]}
                onPress={() => setofficerClass(OFFICER_CLASS.THREE)}>
                {officerClass === OFFICER_CLASS.THREE ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.THREE}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionTouchableContainer,
                  styles.fourSmallOptionList,
                ]}
                onPress={() => setofficerClass(OFFICER_CLASS.FOUR)}>
                {officerClass === OFFICER_CLASS.FOUR ? (
                  <AppIcons.FillRadioBtn color={colors.green} />
                ) : (
                  <AppIcons.RadioBtn />
                )}
                <Text style={styles.optionTitle}>{APP_CONSTANT.FOUR}</Text>
              </TouchableOpacity>
            </View>
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
            <TextInputField
              multiline
              value={nativeAddress}
              title={APP_CONSTANT.NATIVE_DISTRICT_ADDRESS}
              placeholder={APP_CONSTANT.PLEASE_ENTER_REMARKS}
              onChangeText={text => setNativeAddress(text)}
              textInputStyle={styles.ofcAddressTextInput}
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
              value={specelization}
              title={APP_CONSTANT.SPECELIZATOIN}
              placeholder={APP_CONSTANT.PLEASE_ENTER_REMARKS}
              onChangeText={text => setSpecelization(text)}
              textInputStyle={styles.ofcAddressTextInput}
            />
            <TextInputField
              multiline
              value={referenceBy}
              title={APP_CONSTANT.REFERENCE_BY}
              placeholder={APP_CONSTANT.NATIVE_DISTRICT_ADDRESS}
              onChangeText={text => setReferenceBy(text)}
              textInputStyle={styles.ofcAddressTextInput}
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
                  {APP_CONSTANT.UPLOAD_OFFICE_ID}
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
              ? districtList
              : selectedModalType === MODAL_TYPE.OFFICE_DISTRICT
              ? districtList
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
              const filter = districtList.filter(e =>
                e.name
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase()),
              );
              setDistrictList(filter);
            } else if (selectedModalType === MODAL_TYPE.OFFICE_DISTRICT) {
              const filter = districtList.filter(e =>
                e.name
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase()),
              );
              setDistrictList(filter);
            }
          }}
        />
      )}
      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default RegistrationScreen;
