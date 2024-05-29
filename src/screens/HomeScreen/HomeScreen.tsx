import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  OfficerDetail,
  SelectionModal,
  RenderOfficerDetails,
} from '../../components';
import {
  DistrictsObject,
  AppStackParamList,
  DesignationObject,
} from '../../navigation/types';
import styles from './style';
import { AppIcons } from '../../assets';
import { APP_CONSTANT } from '../../constant';
import BottomSheet from '@gorhom/bottom-sheet';
import { colors, ApplicationStyle } from '../../themes';
import { ApiConstant, get } from '../../services/ApiServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const MODAL_TYPE = {
  DESTRICT: 'DESTRICT',
  DESIGNATION: 'DESIGNATION',
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const snapPoints = useMemo(() => ['1%', '85%'], []);

  const [search, setSearch] = useState('');

  const [selectedDistrict, setSelectedDistrict] = useState<DistrictsObject>({});
  const [districtList, setDistrictList] = useState<Array<DistrictsObject>>([]);
  const [designationList, setDesignationList] = useState<
    Array<DesignationObject>
  >([]);
  const [selectedDesignation, setSelectedDesignation] =
    useState<DistrictsObject>({});
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState({});
  const [list, setList] = useState([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    getDistrict();
    getDesignationList();
    const destrictId = 0;
    getData(destrictId, '');
  }, []);

  const getDistrict = () => {
    get(ApiConstant.DISTRICTS)
      .then((res: any) => {
        const arr = res?.data?.data.sort(
          (a: DistrictsObject, b: DistrictsObject) => {
            if (a?.name && b?.name) {
              return a?.name.localeCompare(b?.name);
            }
          },
        );
        setDistrictList(arr);
      })
      .catch(() => null);
  };
  const getDesignationList = () => {
    get(ApiConstant.DESIGNATIONS)
      .then((res: any) => {
        const arr = res?.data?.data.sort(
          (a: DesignationObject, b: DesignationObject) => {
            if (a?.name && b?.name) {
              return a?.name.localeCompare(b?.name);
            }
          },
        );
        setDesignationList(arr);
      })
      .catch(() => null);
  };

  const getData = (
    destrictId: number,
    searchText: string,
    designationId = 0,
  ) => {
    setLoader(true);

    let params = `${ApiConstant.OFFICER_LIST}/${destrictId}?search=${searchText}&designation_id=${designationId}`;
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
    setSearch('');
    setSelectedDistrict({});
    setSelectedDesignation({});
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

  const onSelectDistrict = (selected: DistrictsObject) => {
    setSelectedDistrict(selected);
    const destrictId = selected.id;
    setShowSelectionModal(false);
    getData(Number(destrictId), search);
  };
  const onSelectDesignation = (selected: DesignationObject) => {
    setSelectedDesignation(selected);
    const designationId = selected.id;
    setShowSelectionModal(false);
    getData(Number(selectedDistrict.id), search, Number(designationId));
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
              setModalType(MODAL_TYPE.DESTRICT);
              setShowSelectionModal(true);
            }}>
            <AppIcons.Filter width={35} height={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterIconContainer}
            onPress={() => {
              setModalType(MODAL_TYPE.DESIGNATION);
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
            selected={
              modalType === MODAL_TYPE.DESIGNATION
                ? selectedDesignation
                : selectedDistrict
            }
            title={
              modalType === MODAL_TYPE.DESIGNATION
                ? APP_CONSTANT.DESIGNATION
                : APP_CONSTANT.DISTRICT
            }
            data={
              modalType === MODAL_TYPE.DESIGNATION
                ? designationList
                : districtList
            }
            onSelect={(selected: any) => {
              if (modalType === MODAL_TYPE.DESTRICT) {
                onSelectDistrict(selected);
              } else if (modalType === MODAL_TYPE.DESIGNATION) {
                onSelectDesignation(selected);
              }
            }}
            onClose={() => setShowSelectionModal(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
