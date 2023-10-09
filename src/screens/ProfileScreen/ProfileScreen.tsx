import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
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
import moment from 'moment';

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
  const [data, setData] = useState<UserData>({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await getFromAsync(ASYNC_KEY.AUTH);
    if (userData) {
      const jsonData = JSON.parse(userData);
      setData(jsonData);
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

  const onPressEdit = () => {
    navigation.navigate('RegistrationScreen', {
      isEdit: true,
      userData: data,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{APP_CONSTANT.PROFILE}</Text>
      </View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: data?.photo }}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <RenderPanel
            title={APP_CONSTANT.NAME}
            value={data.first_name}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.MIDDAL_NAME}
            value={data.middal_name}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.SURENAME}
            value={data.last_name}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.EMAIL}
            value={data?.email}
            showSeprator={true}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.MOBILE_NO}
            value={`${data?.mobile_number}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.GENDER}
            value={`${data?.gender}`}
          />
          <RenderPanel
            title={APP_CONSTANT.DOB}
            value={`${moment(data.dob).format('DD-MMM-YYYY')}`}
            showSeprator={false}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.DESIGNATION}
            value={`${data.designation_id}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.CLASS}
            value={`${data.class}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.OFFICE_ADDRESS}
            value={`${data?.office_address}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.OFFICE_DISTRICT}
            value={`${data?.office_district_id}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.NATIVE_ADDRESS}
            value={`${data.native_address}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.NATIVE_DISTRICT}
            value={`${data?.native_district_id}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.SPECELIZATOIN}
            value={`${data?.specialization}`}
          />
          <RenderPanel
            showSeprator={false}
            title={APP_CONSTANT.REMARKS}
            value={`${data?.remarks}`}
          />
        </View>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => onPressEdit()}>
          <Text style={styles.signOutTitle}>{APP_CONSTANT.EDIT}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => onPressSignOut()}>
          <Text style={styles.signOutTitle}>{APP_CONSTANT.SIGN_OUT}</Text>
        </TouchableOpacity>
      </ScrollView>
      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
