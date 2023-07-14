import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import moment from 'moment';
import { Camera } from '../../assets';
import colors from '../../themes/Colors';
import { APP_CONSTANT } from '../../constant';
import { AuthStackParamList } from '../../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActionButton, RenderPanel, TextInputField } from '../../components';

type RegistrationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegistrationScreen'
>;

const RegistrationScreen = (props: RegistrationScreenProps) => {
  const { route } = props;
  const data = {
    multiFactor: {
      enrolledFactors: [],
    },
    metadata: {
      lastSignInTime: 1689352746741,
      creationTime: 1689352746740,
    },
    photoURL:
      'https://lh3.googleusercontent.com/a/AAcHTtcSGzfWIh34UewkzkJW6SDYSb7p9WQ93psdjsnIRKg7Kska=s96-c',
    phoneNumber: null,
    tenantId: null,
    displayName: 'Gunjan Rupapara',
    emailVerified: true,
    isAnonymous: false,
    uid: 'xdRahuUqtFQNPfL5gJjfLqIVkHq2',
    email: 'gunjan87800@gmail.com',
    providerData: [
      {
        email: 'gunjan87800@gmail.com',
        providerId: 'google.com',
        photoURL:
          'https://lh3.googleusercontent.com/a/AAcHTtcSGzfWIh34UewkzkJW6SDYSb7p9WQ93psdjsnIRKg7Kska=s96-c',
        phoneNumber: null,
        displayName: 'Gunjan Rupapara',
        uid: '108759649820766826984',
      },
    ],
    providerId: 'firebase',
  };
  // const data = route.params.userData;
  const [profileImg, setProfileImg] = useState('');
  const [name, setName] = useState('');
  const [middalName, setMiddalName] = useState('');
  const [sureName, setSureName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
    console.warn('A date has been picked: ', date);
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
              <Camera color={colors.secondary} height={25} width={25} />
            </TouchableOpacity>
          </View>
          <View>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionButton
        title={APP_CONSTANT.CREATE_ACCOUNT}
        mainContainerStyle={{ marginHorizontal: 20 }}
      />
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
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
  headerContainer: {
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 1,
    elevation: 5,
    marginBottom: 10,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  imgContainer: {
    borderRadius: 50,
    alignSelf: 'center',
  },
  profileImg: { height: 100, width: 100, borderRadius: 10 },
  dob: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  cameraIcon: {
    position: 'absolute',
    height: 25,
    width: 25,
    bottom: 2.5,
    right: 5,
  },
});

export default RegistrationScreen;
