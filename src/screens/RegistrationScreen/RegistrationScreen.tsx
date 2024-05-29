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
  ERROR,
  MODAL_TYPE,
  USER_PREFIX,
  APP_CONSTANT,
  MARITAL_STATUS,
  OFFICER_CLASS,
  ASYNC_KEY,
} from '../../constant';
import {
  Header,
  Loader,
  ClassOption,
  RenderPanel,
  ActionButton,
  GenderOption,
  PrefixOption,
  StatusOption,
  SelectionModal,
  TextInputField,
  MaritalStatusOption,
} from '../../components';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  UserData,
  DistrictsObject,
  DesignationObject,
  AuthStackParamList,
} from '../../navigation/types';
import moment from 'moment';
import styles from './styles';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import { phoneNumberRegex, setInAsync } from '../../utils';
import { showError } from '../../components/ToastAlert';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ApiConstant,
  get,
  postUpdateRegistration,
  postWithFormData,
} from '../../services/ApiServices';

type RegistrationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegistrationScreen'
>;

const RegistrationScreen = (props: RegistrationScreenProps) => {
  const { navigation, route } = props;
  const isEdit = route.params?.isEdit;
  const data = route.params?.userData;

  const [profileImg, setProfileImg] = useState('');
  const [profileImgObj, setProfileImgObj] = useState<Asset>({});
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
  const [selectedDesignation, setSelectedDesignation] =
    useState<DesignationObject>({});
  const [officerClass, setofficerClass] = useState(OFFICER_CLASS.ONE);
  const [selectedOfficeDistrict, setSelectedOfficeDistrict] =
    useState<DistrictsObject>({});
  const [specelization, setSpecelization] = useState('');
  const [nativeAddress, setNativeAddress] = useState('');
  const [referenceBy, setReferenceBy] = useState('');
  const [selectedNativeDistrict, setSelectedNativeDistrict] =
    useState<DistrictsObject>({});
  const [remarks, setRemarks] = useState('');

  const [selectionTitle, setSelectionTitle] = useState('');
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedModalType, setSelectedModalType] = useState('');
  const [officerIdImgObj, setOfficerIdImgObj] = useState<Asset>({});
  const [officerIdImg, setOfficerIdImg] = useState<string>('');
  const [leavingCertiImgObj, setLeavingCertiImgObj] = useState<Asset>({});
  const [leavingCertiImg, setLeavingCertiImg] = useState<string>('');

  const [designationList, setDesignationList] = useState<
    Array<DesignationObject>
  >([]);
  const [districtList, setDistrictList] = useState<Array<DistrictsObject>>([]);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getDistrict();
    getDesignation();
    if (isEdit) {
      handleEditData();
    } else {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDistrict = () => {
    get(ApiConstant.DISTRICTS)
      .then((res: any) => {
        const arr = res?.data?.data.sort(
          (a: DistrictsObject, b: DistrictsObject) => {
            if (a?.name && b?.name) {
              return a?.name.localeCompare(b?.name);
            }
          },
        );
        if (isEdit) {
          const findOfficeDistrictIndex = arr.findIndex(
            (x: DistrictsObject) => {
              return x.name === data.office_district_id;
            },
          );
          if (findOfficeDistrictIndex !== -1) {
            setSelectedOfficeDistrict(arr[findOfficeDistrictIndex]);
          }
          const findNativeDistrictIndex = arr.findIndex(
            (x: DistrictsObject) => {
              return x.name === data.native_district_id;
            },
          );
          if (findNativeDistrictIndex !== -1) {
            setSelectedNativeDistrict(arr[findNativeDistrictIndex]);
          }
        }
        setDistrictList(arr);
      })
      .catch(() => null);
  };

  const getDesignation = () => {
    get(ApiConstant.DESIGNATIONS)
      .then((res: any) => {
        const arr = res?.data?.data.sort(
          (a: DesignationObject, b: DesignationObject) => {
            if (a?.name && b?.name) {
              return a?.name.localeCompare(b?.name);
            }
          },
        );
        if (isEdit) {
          const findDesignationIndex = arr.findIndex((x: DesignationObject) => {
            return x.name === data.designation_id;
          });
          if (findDesignationIndex !== -1) {
            setSelectedDesignation(arr[findDesignationIndex]);
          }
        }
        setDesignationList(arr);
      })
      .catch(() => null);
  };

  const getUserData = async () => {
    setName(data?.displayName ? data?.displayName.split(' ')[0] ?? '' : '');
    setSureName(data?.displayName ? data?.displayName.split(' ')[1] ?? '' : '');
    setEmail(data?.email!);
    if (data?.photoURL) {
      setProfileImg(data?.photoURL);
    }
  };

  const handleEditData = () => {
    setName(data.first_name!);
    setMiddalName(data.middal_name!);
    setSureName(data.last_name!);
    setEmail(data.email!);
    setDob(new Date(data?.dob!));
    setPrefix(data?.prefix!);
    setGender(data?.gender!);
    setProfileImg(data?.photo!);
    setStatus(data?.job_status!);
    setReferenceBy(data?.reference_by!);
    setSpecelization(data.specialization!);
    setNativeAddress(data.native_address!);
    setMarritalStatus(data.marital_status!);
    setOfficeAddress(data.office_address!);
    setPhoneNumber(data.mobile_number!);
    setAlterPhoneNumber(data.alt_mobile_number!);
    setofficerClass(data.class!);
    setRemarks(data?.remarks!);
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
    includeBase64: false,
  };

  const onPressCameraIcon = () => {
    launchImageLibrary(imageOptions, async function (image) {
      if (!image || image.didCancel) {
      } else if (image.assets) {
        setProfileImg(`${image.assets[0].uri}`);
        setProfileImgObj(image?.assets[0]);
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
          var uri = image.assets[0].uri;
          if (uri) {
            setOfficerIdImg(uri);
            setOfficerIdImgObj(image?.assets[0]);
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
          setLeavingCertiImgObj(image?.assets[0]);
        }
      }
    });
  };

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
    } else if (officeAddress === '') {
      showError(ERROR.PLEASE_ENTER_OFFICE_ADDRESS);
      return false;
    } else if (Object.keys(selectedDesignation).length === 0) {
      showError(ERROR.PLEASE_SELECT_YOUR_DESIGNATION);
      return false;
    } else if (Object.keys(officeAddress).length === 0) {
      showError(ERROR.PLEASE_SELECT_YOUR_OFFICE_ADDREDSS);
      return false;
    } else if (Object.keys(selectedNativeDistrict).length === 0) {
      showError(ERROR.PLEASE_SELECT_YOUR_NATIVE_DISTRICT);
      return false;
    } else if (!isEdit && officerIdImg === '') {
      showError(ERROR.PLEASE_UPLOAD_OFFICE_ID);
      return false;
    } else if (!isEdit && leavingCertiImg === '') {
      showError(ERROR.PLEASE_UPLOAD_LEAVING_CERTIFICATE);
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
        gender: gender,
        marital_status: marritalStatus,
        job_status: status,
        dob: moment(dob).format('YYYY-MM-DD'),
        email: email,
        mobile_number: phoneNumber,
        alt_mobile_number: alterPhoneNumber,
        designation_id: Number(selectedDesignation.id),
        office_address: officeAddress,
        class: officerClass,
        office_district_id: selectedOfficeDistrict?.id,
        native_district_id: selectedNativeDistrict.id,
        native_address: nativeAddress,
        specialization: specelization,
        reference_by: referenceBy,
        remarks: remarks,
        office_id_photo: officerIdImgObj,
        leaving_certificate_photo: leavingCertiImgObj,
      };

      setLoader(true);
      postWithFormData(ApiConstant.REGISTER, obj)
        .then(() => {
          setTimeout(() => {
            setLoader(false);
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

  const enableEditButton = () => {
    if (
      profileImg === data.photo &&
      name === data.first_name &&
      middalName === data.middal_name &&
      sureName === data.last_name &&
      prefix === data.prefix &&
      gender === data.gender &&
      marritalStatus === data.marital_status &&
      status === data.job_status &&
      phoneNumber === data.mobile_number &&
      alterPhoneNumber === data.alt_mobile_number &&
      officeAddress === data.office_address &&
      officerClass === data.class &&
      nativeAddress === data.native_address &&
      specelization === data.specialization &&
      referenceBy === data.reference_by &&
      remarks === data.remarks
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onPressEdit = () => {
    if (checkValidation()) {
      const obj: UserData = {
        google_id: data.uid,
        prefix: prefix,
        first_name: name,
        middal_name: middalName,
        last_name: sureName,
        gender: gender,
        marital_status: marritalStatus,
        job_status: status,
        dob: moment(dob).format('YYYY-MM-DD'),
        email: email,
        mobile_number: phoneNumber,
        alt_mobile_number: alterPhoneNumber,
        designation_id: Number(selectedDesignation.id),
        office_address: officeAddress,
        class: officerClass,
        office_district_id: selectedOfficeDistrict?.id,
        native_district_id: selectedNativeDistrict.id,
        native_address: nativeAddress,
        specialization: specelization,
        reference_by: referenceBy,
        remarks: remarks,
      };

      if (profileImg !== data.photo) {
        obj.photoObj = profileImgObj;
      }
      setLoader(true);
      postUpdateRegistration(`${ApiConstant.EDIT_PROFILE}/${data.id}`, obj)
        .then(async (res: any) => {
          await setInAsync(ASYNC_KEY.AUTH, JSON.stringify(res.data.data.data));
          navigation.goBack();
        })
        .catch(err => {
          const msgObj = err.response.data?.message;
          const msg = Object.keys(msgObj)[0];
          showError(msgObj[msg][0]);
        })
        .finally(() => setLoader(false));
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['bottom']}>
      <Header
        title={APP_CONSTANT.REGISTRATION}
        showLeftArrow={isEdit}
        onPressBackArrow={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: profileImg?.includes('https')
                  ? profileImg
                  : ApiConstant.BASE_URL_IMAGE + profileImg,
              }}
              style={styles.profileImg}
              resizeMode="cover"
            />
            {isEdit && (
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={() => onPressCameraIcon()}>
                <AppIcons.Camera
                  color={colors.secondary}
                  height={25}
                  width={25}
                />
              </TouchableOpacity>
            )}
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
            <PrefixOption
              selectedPrefix={prefix}
              setPrefix={text => setPrefix(text)}
            />

            <GenderOption
              selectedGender={gender}
              genderSelection={text => genderSelection(text)}
            />
            <MaritalStatusOption
              selectedMarritalStatus={marritalStatus}
              setMarritalStatus={text => setMarritalStatus(text)}
            />

            <StatusOption
              selectedStatus={status}
              statusSelection={text => statusSelection(text)}
            />

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
            <ClassOption
              selectedOfficerClass={officerClass}
              setofficerClass={text => setofficerClass(text)}
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
            <TextInputField
              multiline
              value={nativeAddress}
              title={APP_CONSTANT.NATIVE_ADDRESS}
              placeholder={APP_CONSTANT.PLEASE_ENTER_NATIVE_DISTRICT}
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
              placeholder={APP_CONSTANT.PLEASE_ENTER_YOUR_SPECELIZATION}
              onChangeText={text => setSpecelization(text)}
              textInputStyle={styles.ofcAddressTextInput}
            />
            <TextInputField
              value={referenceBy}
              title={APP_CONSTANT.REFERENCE_BY}
              placeholder={APP_CONSTANT.REFERENCE_BY}
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
            {!isEdit && (
              <>
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
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isEdit ? (
        <ActionButton
          disabled={enableEditButton()}
          title={APP_CONSTANT.UPDATE}
          onPress={() => onPressEdit()}
          mainContainerStyle={styles.createBtnContainer}
        />
      ) : (
        <ActionButton
          title={APP_CONSTANT.CREATE_ACCOUNT}
          onPress={() => onPressCreateAccount()}
          mainContainerStyle={styles.createBtnContainer}
        />
      )}

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
          title={selectionTitle}
          data={
            selectedModalType === MODAL_TYPE.DESIGNATION
              ? designationList
              : selectedModalType === MODAL_TYPE.NATIVE_DISTRICT
              ? districtList
              : selectedModalType === MODAL_TYPE.OFFICE_DISTRICT
              ? districtList
              : []
          }
          selected={
            selectedModalType === MODAL_TYPE.DESIGNATION
              ? selectedDesignation
              : selectedModalType === MODAL_TYPE.NATIVE_DISTRICT
              ? selectedNativeDistrict
              : selectedModalType === MODAL_TYPE.OFFICE_DISTRICT
              ? selectedOfficeDistrict
              : {}
          }
          onClose={() => setShowSelectionModal(false)}
          onSelect={selected => {
            setShowSelectionModal(false);
            handleSelection(selected);
          }}
        />
      )}
      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default RegistrationScreen;
