import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import { Loader } from '../../components';
import { getFromAsync } from '../../utils';
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import { APP_CONSTANT, ASYNC_KEY } from '../../constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList, UserData } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  title?: string;
  value?: string;
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

const ProfileScreen = (props: ProfileScreenProps) => {
  const { navigation } = props;
  // const [profileImg, setProfileImg] = useState('');
  const [name, setName] = useState('');
  const [middalName, setMiddalName] = useState('');
  const [sureName, setSureName] = useState('');
  const [data, setData] = useState<UserData>({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await getFromAsync(ASYNC_KEY.AUTH);
    if (userData) {
      const jsonData = JSON.parse(userData);
      setName(jsonData.first_name);
      setMiddalName(jsonData.middal_name);
      setSureName(jsonData.last_name);
      setData(jsonData);
      // setProfileImg(userData.photoURL);
    }
  };

  const onPressSignOut = async () => {
    setLoader(true);
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.clear();
        setLoader(false);
        navigation.dispatch(StackActions.replace('AuthStack'));
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{APP_CONSTANT.PROFILE}</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* <View style={styles.imgContainer}>
          <Image
            source={{ uri: profileImg }}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View> */}
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
            value={data?.email}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.MOBILE_NO}
            value={`${data?.mobile_number}`}
            showSeprator={false}
          />
        </View>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => onPressSignOut()}>
          <Text style={styles.signOutTitle}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
