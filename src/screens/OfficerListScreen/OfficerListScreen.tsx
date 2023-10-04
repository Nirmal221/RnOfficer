import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import { RenderOfficerDetails } from '../../components';
import OfficerDetail from '../../components/OfficerDetail';
import { AppStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiConstant, get } from '../../services/ApiServices';
import { ApplicationStyle, height, width } from '../../themes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type OfficerListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'OfficerListScreen'
>;

const OfficerListScreen = (props: OfficerListScreenProps) => {
  const { navigation, route } = props;
  const title = route.params.cityObj?.name;
  // const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState({});
  const snapPoints = useMemo(() => ['1%', '75%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    const destrictId = route.params.cityObj?.id;
    setLoader(true);
    get(`${ApiConstant.OFFICER_LIST}${destrictId}`)
      .then((res: any) => {
        setList(res?.data?.data);
      })
      .catch(() => null)
      .finally(() => {
        setLoader(false);
        setRefreshing(false);
      });
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
        {/* <TextInput
          value={search}
          placeholder="Search"
          placeholderTextColor={colors.grey}
          style={styles.searchTextInput}
          onChangeText={(text: string) => setSearch(text)}
        /> */}
        {loader ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={list}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            onScroll={() => {
              if (bottomSheetRef?.current) {
                bottomSheetRef?.current.close();
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[colors.green, colors.green]}
                tintColor={'#9Bd35A'}
                onRefresh={() => {
                  setRefreshing(true);
                  setTimeout(() => {
                    getData();
                  }, 1500);
                }}
              />
            }
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: height * 0.8,
                    width: width * 0.9,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ color: colors.grey, ...ApplicationStyle.f16w400 }}>
                    No Data Found
                  </Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => (
              <RenderOfficerDetails
                item={item}
                index={index}
                onPress={() => {
                  setSelectedOfficer(item);
                  if (bottomSheetRef.current) {
                    bottomSheetRef.current.expand();
                  }
                }}
              />
            )}
          />
        )}
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
