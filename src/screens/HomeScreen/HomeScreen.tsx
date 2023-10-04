import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import { APP_CONSTANT } from '../../constant';
import BottomSheet from '@gorhom/bottom-sheet';
import { RenderOfficerDetails } from '../../components';
import { colors, ApplicationStyle } from '../../themes';
import OfficerDetail from '../../components/OfficerDetail';
import { ApiConstant, get } from '../../services/ApiServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList, DistrictsObject } from '../../navigation/types';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const snapPoints = useMemo(() => ['1%', '75%'], []);

  // const [search, setSearch] = useState('');
  const [districtList, setDistrictList] = useState<Array<DistrictsObject>>([]);
  // const [searchList, setSearchList] = useState<Array<DistrictsObject>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState({});
  const [list, setList] = useState([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    getDistrict();
    getData();
  }, []);

  const getDistrict = () => {
    get(ApiConstant.DISTRICTS)
      .then((res: any) => {
        setDistrictList(res?.data?.data);
      })
      .catch(() => null);
  };

  const getData = () => {
    const destrictId = 1;
    // const destrictId = route.params.cityObj?.id;
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

  // const onSearch = (text: string) => {
  //   setSearch(text);
  //   const filtered = districtList.filter((e: DistrictsObject) =>
  //     e?.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
  //   );
  //   if (filtered.length > 0) {
  //     setSearchList(filtered);
  //   } else {
  //     setSearchList([]);
  //   }
  // };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{APP_CONSTANT.DISTRICT}</Text>
      </View>
      <View style={styles.container}>
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
                <View style={styles.emptyListContainer}>
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
        {/* <FlatList
          data={districtList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={['#9Bd35A', '#689F38']}
              tintColor={'#9Bd35A'}
              onRefresh={() => onRefresh()}
            />
          }
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyboardDismissMode="on-drag"
          // ListHeaderComponent={
          //   <TextInput
          //     value={search}
          //     placeholder={APP_CONSTANT.SEARCH}
          //     placeholderTextColor={colors.grey}
          //     style={styles.searchTextInput}
          //     onChangeText={(text: string) => onSearch(text)}
          //   />
          // }
          renderItem={({ item }: { item: DistrictsObject }) => {
            const itemTitle = item?.name;
            return (
              <View style={styles.linearGradient}>
                <TouchableOpacity
                  style={styles.cityContainer}
                  onPress={() => {
                    navigation.navigate('OfficerListScreen', {
                      cityObj: item,
                    });
                  }}>
                  <Text style={styles.cityLabel} numberOfLines={1}>
                    {itemTitle}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        /> */}
        <OfficerDetail
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          selectedOfficer={selectedOfficer}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
