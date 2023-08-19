import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import styles from './OfficerListScreen.style';
import { AppStackParamList } from '../../navigation';
import { RenderOfficerDetails } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ApplicationStyle from '../../themes/ApplicationStyle';
import OfficerDetail from '../../components/OfficerDetail';

type OfficerListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'OfficerListScreen'
>;

const OfficerListScreen = (props: OfficerListScreenProps) => {
  const { navigation, route } = props;
  const title = route.params.cityObj?.name;
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState({});
  const snapPoints = useMemo(() => ['1%', '75%'], []);
  const bottomSheetRef = useRef(null);

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

  return (
    <SafeAreaView style={styles.mainContainer} edges={['']}>
      <View style={[ApplicationStyle.headerShadow, styles.headerContainer]}>
        <TouchableOpacity
          style={styles.headerLeftContainer}
          onPress={() => navigation.goBack()}>
          <AppIcons.BackArrow color={colors.black} height={20} width={20} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.headerRightContainer} />
      </View>
      <View style={styles.container}>
        <TextInput
          value={search}
          placeholder="Search"
          placeholderTextColor={colors.grey}
          style={styles.searchTextInput}
          onChangeText={(text: string) => setSearch(text)}
        />
        <FlatList
          data={Array(10).fill(data)}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          onScroll={() => {
            bottomSheetRef.current.close();
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[colors.green, colors.green]}
              tintColor={'#9Bd35A'}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                  setRefreshing(false);
                }, 1500);
              }}
            />
          }
          renderItem={({ item, index }) => (
            <RenderOfficerDetails
              item={item}
              index={index}
              onPress={() => {
                setSelectedOfficer(data);
                bottomSheetRef.current.expand();
              }}
            />
          )}
        />
      </View>
      <OfficerDetail
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        selectedOfficer={selectedOfficer}
      />
    </SafeAreaView>
  );
};

export default OfficerListScreen;
