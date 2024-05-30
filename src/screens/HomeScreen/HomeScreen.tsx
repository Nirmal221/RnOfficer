import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import style from './style';
import { AppIcons } from '../../assets';
import BottomSheet from '@gorhom/bottom-sheet';
import { RenderOfficerDetails } from '../../components';
import { colors, ApplicationStyle } from '../../themes';
import AddNotesModal from '../../components/AddNotesModal';
import { AppStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiConstant, get, post } from '../../services/ApiServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Context } from '../../AppContext/AppContext';
import moment from 'moment';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { theme } = useContext(Context);
  const styles = style(theme === 'light');
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([
    // { id: 1, title: 'Test', description: 'Test', date: moment() },
    // { id: 2, title: 'TestDescription', description: 'Test', date: moment() },
  ]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<{ id?: number }>({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoader(true);
    get(ApiConstant.VIEW)
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
  };

  const onCloseModal = () => {
    setSelectedNote({});
    setShowAddModal(false);
  };

  const onPressAdd = (created: any) => {
    post(ApiConstant.ADD_NOTES, created)
      .then((res: any) => {
        const responseNoteId = res.data.noteId;
        const temp: any = [...list];
        temp.push({
          ...created,
          id: responseNoteId,
        });
        setList(temp);
      })
      .catch(() => {});
  };

  const onPressUpdate = (created: any) => {
    post(`${ApiConstant.UPDATE_NOTES}/:${selectedNote.id}`, created)
      .then(() => getData())
      .catch(() => {});
  };

  const onPressDelete = () => {
    setSelectedNote({});
    setShowAddModal(false);
    post(`${ApiConstant.DELETE_NOTES}/:${selectedNote.id}`, {})
      .then(() => getData())
      .catch(() => {});
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
        <AppIcons.Plus
          height={30}
          width={30}
          color={theme === 'light' ? colors.background : colors.black}
        />
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
        {showAddModal && (
          <AddNotesModal
            selected={selectedNote}
            isVisible={showAddModal}
            onPressAdd={created => {
              if (Object.keys(selectedNote).length === 0) {
                onPressAdd(created);
              } else {
                onPressUpdate(created);
              }
            }}
            closeModal={() => onCloseModal()}
            onPressDelete={() => onPressDelete()}
          />
        )}
      </View>
      {renderAddButton()}
    </SafeAreaView>
  );
};

export default HomeScreen;
