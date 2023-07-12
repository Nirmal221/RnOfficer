import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../themes/Colors';
import { APP_CONSTANT } from '../../constant';
import { ActionButton, RenderPanel, TextInputField } from '../../components';
import { AuthStackParamList } from '../../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';

type RegistrationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegistrationScreen'
>;

const RegistrationScreen = (props: RegistrationScreenProps) => {
  const { route } = props;
  const data = {
    displayName: 'Nirmal Sorathiya',
    email: 'nirmalsorathiya112233@gmail.com',
    emailVerified: true,
    isAnonymous: false,
    metadata: {
      creationTime: 1688663450902,
      lastSignInTime: 1689178117100,
    },
    multiFactor: {
      enrolledFactors: [Array],
    },
    phoneNumber: null,
    photoURL:
      'https://lh3.googleusercontent.com/a/AAcHTtdwwx25aEHs-1k-9_aukZ3xov_7ZJchEM3aXlL5CwbC45o=s96-c',
    providerData: [[Object]],
    providerId: 'firebase',
    refreshToken:
      'APZUo0REBWyEcameQgDSDC_iFvl1pHBk_pEoldB3Bkr0rroZIC2mudB7NfhAcpPTfyM8tn3gqY45ARQTvOLVI3sFQq6TcUQ3eiSDXGfDdeGWtGB9jYizxtMKAs0IFtz24g6ZyoNeKZEY103jN8pKt0rPGSWbObaDzG6Sa7fd927tyBmFBuBCBVV1pfgtVcloFlMOq3IfXV-P5wuXVXd8htTR4BCLmKJLXWZga9vIy4-ohZLpB1qBhCJM4c2J2WdRLZT45Qwl3jQUxV8HmvGqeLx3h7fbibsZxCEq0Kyu5ttFcL79lVqoUkKdmjHFTh0bugEwtGi0ck51-SHgOV0RhOjMvYMn51G0ga5--jw-B7l6DOs4Ifo1bdipSTkLYngXWDDWSot720-diqACObwOiMEpLKq-yQdOug7CB3fpK6w8S3KwP1XVB1m28EKHZUJ8_gat_a2e85bA',
    tenantId: null,
    uid: 'khhMyX4F8VYmij9Zub10F6MzRi03',
  };
  // const data = route.params.userData;
  const [profileImg, setProfileImg] = useState('');
  const [name, setName] = useState('');
  const [middalName, setMiddalName] = useState('');
  const [sureName, setSureName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setdob] = useState(new Date());
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

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setdob(date);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Registration</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: profileImg }}
              style={styles.profileImg}
              resizeMode="contain"
            />
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
              panelTitle="panelTitle"
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
        <ActionButton title="Test" mainContainerStyle={{}} />
      </KeyboardAvoidingView>
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
    overflow: 'hidden',
  },
  profileImg: { height: 100, width: 100 },
  dob: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
});

export default RegistrationScreen;
