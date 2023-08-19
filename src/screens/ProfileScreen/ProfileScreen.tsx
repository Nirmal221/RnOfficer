import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import { APP_CONSTANT } from '../../constant';
import { AppStackParamList } from '../../navigation';
import { ICON_SIZE, statusBarHeight } from '../../themes';
import ApplicationStyle from '../../themes/ApplicationStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProfileScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ProfileScreen'
>;

const RenderPanel = ({
  title,
  value,
  showSeprator,
}: {
  title: string;
  value: string;
  showSeprator: boolean;
}) => {
  return (
    <>
      <View style={styles.panelContainer}>
        <Text style={styles.panelTitle}>{title}</Text>
        <Text style={styles.valueText}>{value !== 'null' ? value : ''}</Text>
      </View>
      {showSeprator && <View style={styles.separator} />}
    </>
  );
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [profileImg, setProfileImg] = useState('');
  const [name, setName] = useState('');
  const [middalName, setMiddalName] = useState('');
  const [sureName, setSureName] = useState('');

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

  useEffect(() => {
    setName(data.displayName.split(' ')[0] ?? '');
    setSureName(data.displayName.split(' ')[1] ?? '');
    setProfileImg(data.photoURL);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer} edges={['bottom']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcons.BackArrow
            height={ICON_SIZE.I_25}
            width={ICON_SIZE.I_25}
            color={colors.secondary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{APP_CONSTANT.PROFILE}</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: profileImg }}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <RenderPanel
            title={APP_CONSTANT.NAME}
            value={name}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.MIDDAL_NAME}
            value={middalName}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.SURENAME}
            value={sureName}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.EMAIL}
            value={data.email}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.MOBILE_NO}
            value={`${data?.phoneNumber}`}
            showSeprator={false}
          />
        </View>
      </ScrollView>
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
    padding: 12,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight * 0.3,
  },
  headerTitle: {
    paddingLeft: 10,
    color: colors.black,
    ...ApplicationStyle.f17w500,
  },
  imgContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImg: { height: 100, width: 100, borderRadius: 50 },
  contentContainer: {
    backgroundColor: colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  panelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  panelTitle: {
    ...ApplicationStyle.f16w400,
    color: colors.black,
  },
  valueContainer: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderRadius: 1,
    borderLeftColor: colors.grey,
  },
  valueText: {
    ...ApplicationStyle.f16w400,
    color: colors.blue,
  },
  separator: {
    height: 1,
    backgroundColor: colors.grey,
    borderRadius: 10,
    opacity: 0.5,
  },
});

export default ProfileScreen;
