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
import LinearGradient from 'react-native-linear-gradient';
import { ICON_SIZE, statusBarHeight } from '../../themes';
import ApplicationStyle from '../../themes/ApplicationStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProfileScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ProfileScreen'
>;

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
      <LinearGradient
        colors={[colors.secondary, colors.green]}
        style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AppIcons.BackArrow
            height={ICON_SIZE.I_20}
            width={ICON_SIZE.I_20}
            color={colors.secondary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{APP_CONSTANT.PROFILE}</Text>
        <View style={{ paddingHorizontal: 20 }} />
      </LinearGradient>
      <ScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: profileImg }}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
        {/* Name */}
        <View style={styles.panelContainer}>
          <Text style={styles.panelTitle}>{APP_CONSTANT.NAME}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{name}</Text>
          </View>
        </View>
        {/* Middal Name */}
        <View style={styles.panelContainer}>
          <Text style={styles.panelTitle}>{APP_CONSTANT.MIDDAL_NAME}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{middalName}</Text>
          </View>
        </View>
        {/* Sure Name */}
        <View style={styles.panelContainer}>
          <Text style={styles.panelTitle}>{APP_CONSTANT.SURENAME}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{sureName}</Text>
          </View>
        </View>
        {/* Email Name */}
        <View style={styles.panelContainer}>
          <Text style={styles.panelTitle}>{APP_CONSTANT.EMAIL}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{data.email}</Text>
          </View>
        </View>
        {/* Phone Number */}
        <View style={styles.panelContainer}>
          <Text style={styles.panelTitle}>{APP_CONSTANT.MOBILE_NO}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{data.phoneNumber}</Text>
          </View>
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
    backgroundColor: colors.secondary,
  },
  headerContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight * 0.3,
  },
  headerTitle: {
    color: colors.secondary,
    ...ApplicationStyle.f20w600,
  },
  imgContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImg: { height: 100, width: 100, borderRadius: 50 },
  panelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  panelTitle: {
    width: '45%',
    ...ApplicationStyle.f17w500,
    color: colors.black,
  },
  valueContainer: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderRadius: 1,
    borderLeftColor: colors.grey,
  },
  valueText: {
    ...ApplicationStyle.f15w500,
    color: colors.black,
  },
});

export default ProfileScreen;
