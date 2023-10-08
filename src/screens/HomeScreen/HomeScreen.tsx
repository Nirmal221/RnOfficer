import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  OfficerDetail,
  SelectionModal,
  RenderOfficerDetails,
} from '../../components';
import styles from './style';
import { AppIcons } from '../../assets';
import { APP_CONSTANT } from '../../constant';
import BottomSheet from '@gorhom/bottom-sheet';
import { colors, ApplicationStyle } from '../../themes';
import { ApiConstant, get } from '../../services/ApiServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList, DistrictsObject } from '../../navigation/types';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const snapPoints = useMemo(() => ['1%', '93%'], []);

  const [search, setSearch] = useState('');

  const [selectedDistrict, setSelectedDistrict] = useState<DistrictsObject>({});
  const [districtList, setDistrictList] = useState<Array<DistrictsObject>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState({});
  const [list, setList] = useState([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showSelectionModal, setShowSelectionModal] = useState(false);

  useEffect(() => {
    getDistrict();
    const destrictId = 0;
    getData(destrictId, '');
  }, []);

  const getDistrict = () => {
    get(ApiConstant.DISTRICTS)
      .then((res: any) => {
        setDistrictList(res?.data?.data);
      })
      .catch(() => null);
  };

  const getData = (destrictId: number, searchText: string) => {
    setLoader(true);

    let params = `${ApiConstant.OFFICER_LIST}/${destrictId}`;
    if (searchText.length > 0) {
      params += `?search=${searchText}`;
    }
    get(params)
      .then((res: any) => {
        setList(res?.data?.data);
      })
      .catch(() => null)
      .finally(() => {
        setLoader(false);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const destrictId = 0;
      getData(destrictId, '');
    }, 1500);
  };

  const onSearch = (text: string) => {
    setSearch(text);
    const destrictId = selectedDistrict.id ? selectedDistrict.id : 0;
    if (text.length > 2) {
      getData(Number(destrictId), text);
    } else if (text.length === 0) {
      getData(Number(destrictId), '');
    }
  };

  const onModalSelection = (selected: DistrictsObject) => {
    setSelectedDistrict(selected);
    setShowSelectionModal(false);
    const destrictId = selected.id;
    getData(Number(destrictId), search);
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={{ color: colors.grey, ...ApplicationStyle.f16w400 }}>
          No Data Found
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{APP_CONSTANT.DISTRICT}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            value={search}
            placeholder={APP_CONSTANT.SEARCH}
            placeholderTextColor={colors.grey}
            style={styles.searchTextInput}
            onChangeText={(text: string) => onSearch(text)}
          />
          <TouchableOpacity
            style={styles.filterIconContainer}
            onPress={() => {
              setShowSelectionModal(true);
            }}>
            <AppIcons.Filter width={35} height={35} />
          </TouchableOpacity>
        </View>
        {loader ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={colors.green} />
          </View>
        ) : (
          <>
            <FlatList
              data={list}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              contentContainerStyle={styles.contentContainerStyle}
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
                  onRefresh={() => onRefresh()}
                />
              }
              ListEmptyComponent={renderEmptyList}
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
          </>
        )}
        <OfficerDetail
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          selectedOfficer={selectedOfficer}
        />

        {showSelectionModal && (
          <SelectionModal
            visible={showSelectionModal}
            selected={selectedDistrict}
            title=""
            data={districtList}
            onSelect={(selecetd: any) => {
              onModalSelection(selecetd);
            }}
            onClose={() => {
              setShowSelectionModal(false);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
