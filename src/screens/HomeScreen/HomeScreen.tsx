import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import { AppIcons } from '../../assets';
import BottomSheet from '@gorhom/bottom-sheet';
import { colors, ApplicationStyle } from '../../themes';
import { AppStackParamList } from '../../navigation/types';
import AddNotesModal from '../../components/AddNotesModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OfficerDetail, RenderOfficerDetails } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const snapPoints = useMemo(() => ['1%', '85%'], []);

  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState({});
  const [list, setList] = useState([
    { id: 1, title: 'Test', description: 'Test', date: moment() },
    { id: 2, title: 'TestDescription', description: 'Test', date: moment() },
    { id: 3, title: 'Test', description: 'Test', date: moment() },
    { id: 4, title: 'Test', description: 'Test', date: moment() },
    { id: 5, title: 'Test', description: 'Test', date: moment() },
    { id: 6, title: 'Test', description: 'Test', date: moment() },
  ]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});

  useEffect(() => {}, []);

  const getData = (
    destrictId: number,
    searchText: string,
    designationId = 0,
  ) => {
    // setLoader(true);
    // let params = `${ApiConstant.OFFICER_LIST}/${destrictId}?search=${searchText}&designation_id=${designationId}`;
    // get(params)
    //   .then((res: any) => {
    //     setList(res?.data?.data);
    //   })
    //   .catch(() => null)
    //   .finally(() => {
    //     setLoader(false);
    //     setRefreshing(false);
    //   });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const destrictId = 0;
      getData(destrictId, '');
    }, 1500);
  };

  const onCloseModal = () => {
    setSelectedNote({});
    setShowAddModal(false);
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

  const renderAddButton = () => {
    return (
      <TouchableOpacity
        style={styles.plusButtonContainer}
        onPress={() => setShowAddModal(true)}>
        <AppIcons.Plus height={30} width={30} color={colors.background} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.container}>
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
                    setSelectedNote(item);
                    setShowAddModal(true);
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
        {showAddModal && (
          <AddNotesModal
            selected={selectedNote}
            isVisible={showAddModal}
            onPressAdd={created => {}}
            closeModal={() => onCloseModal()}
            onPressDelete={() => onCloseModal()}
          />
        )}
      </View>
      {renderAddButton()}
    </SafeAreaView>
  );
};

export default HomeScreen;
