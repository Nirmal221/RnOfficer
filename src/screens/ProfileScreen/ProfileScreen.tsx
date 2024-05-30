import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import style from './style';
import { Loader } from '../../components';
import { getFromAsync, setInAsync } from '../../utils';
import { APP_CONSTANT, ASYNC_KEY } from '../../constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList, UserData } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Context } from '../../AppContext/AppContext';

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
  const { theme } = useContext(Context);
  const styles = style(theme === 'light');
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
  const { theme, setTheme } = useContext(Context);
  const [data, setData] = useState<UserData>({});
  const [loader, setLoader] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isFocused = useIsFocused();
  const [showSupport, setShowSupport] = useState(false);
  const styles = style(theme === 'light');

  useEffect(() => {
    if (isFocused) {
      getUserData();
    }
  }, [isFocused]);

  const getUserData = async () => {
    const userData = await getFromAsync(ASYNC_KEY.AUTH);
    if (userData) {
      const jsonData = JSON.parse(userData);
      setData(jsonData);
    }
  };

  const onPressSignOut = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(StackActions.replace('AuthStack'));
  };

  const onPressContactSupport = () => {
    setShowSupport(!showSupport);
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
          <Text style={styles.profileTitle}>{`${data.username}`}</Text>
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, showProfile && styles.profileButton]}
          onPress={() => setShowProfile(!showProfile)}>
          <Text style={styles.buttonTitle}>{APP_CONSTANT.PROFILE}</Text>
        </TouchableOpacity>

        {showProfile && (
          <View style={styles.contentContainer}>
            <RenderPanel title={APP_CONSTANT.EMAIL} value={data?.username} />
          </View>
        )}
        <TouchableOpacity
          style={[styles.buttonContainer, showProfile && styles.profileButton]}
          onPress={async () => {
            if (theme === 'dark') {
              await setInAsync(ASYNC_KEY.THEME, 'light');
              setTheme('light');
            } else {
              await setInAsync(ASYNC_KEY.THEME, 'dark');
              setTheme('dark');
            }
          }}>
          <Text style={styles.buttonTitle}>Theme</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.buttonContainer, showSupport && styles.profileButton]}
          onPress={() => onPressContactSupport()}>
          <Text style={styles.buttonTitle}>{APP_CONSTANT.CONTACT_SUPPORT}</Text>
        </TouchableOpacity>
        {showSupport && (
          <View style={styles.contentContainer}>
            <RenderPanel
              showSeprator={false}
              title={''}
              value={''}
            />
            <RenderPanel
              showSeprator={false}
              title={''}
              value={''}
            />
          </View>
        )} */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onPressSignOut()}>
          <Text style={styles.buttonTitle}>{APP_CONSTANT.SIGN_OUT}</Text>
        </TouchableOpacity>
      </ScrollView>
      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
