import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Separator from './Separator';
import { AppIcons } from '../assets';
import colors from '../themes/Colors';
import { APP_CONSTANT } from '../constant';
import TextInputField from './TextInputField';
import ApplicationStyle from '../themes/ApplicationStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DesignationObject, DistrictsObject } from '../navigation/types';

type SelectionModalProp = {
  title: string;
  selected: DistrictsObject | DesignationObject;
  visible: boolean;
  showIndex?: boolean;
  data: Array<DistrictsObject | DesignationObject>;
  onClose: () => void;
  onSelect: (selected: {}) => void;
};

const SelectionModal = ({
  title,
  visible,
  onClose,
  data,
  onSelect,
  showIndex,
  selected,
}: SelectionModalProp) => {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState<
    Array<DistrictsObject | DesignationObject>
  >([]);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => onClose()} style={{ flex: 1 }}>
          <Text style={styles.headerLeftTitle}>{APP_CONSTANT.CLOSE}</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.headerRightContainer} />
      </View>
    );
  };

  const onSearch = (text: string) => {
    setSearch(text);
    const filter = data.filter((x: DistrictsObject | DesignationObject) => {
      return x?.name!.toLocaleLowerCase().includes(text.toLocaleLowerCase());
    });
    setSearchList(filter);
  };

  return (
    <Modal
      visible={visible}
      style={styles.mainContainer}
      presentationStyle="formSheet"
      animationType="slide">
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <TextInputField
          value={search}
          placeholder={`Search Yout ${title}`}
          onChangeText={(text: string) => {
            onSearch(text);
          }}
          textInputStyle={{ borderColor: colors.grey }}
          containerStyle={styles.searchBarContainer}
        />
        <FlatList
          data={searchList.length > 0 ? searchList : data}
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({
            item,
            index,
          }: {
            item: DistrictsObject | DesignationObject;
            index: number;
          }) => {
            const itemTitle = item?.name;
            return (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => onSelect(item)}>
                {showIndex && (
                  <Text style={styles.itemTitle}>{`${index + 1}.  `}</Text>
                )}
                <Text style={styles.itemTitle}>{itemTitle}</Text>
                {`${selected?.id}` === `${item?.id}` && (
                  <AppIcons.CheckMark height={20} width={20} />
                )}
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { flex: 1, paddingVertical: 15, paddingHorizontal: 10 },
  headerContainer: {
    paddingVertical: 5,
    ...ApplicationStyle.rowAlignCenterJustifyBetween,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerLeftTitle: { ...ApplicationStyle.f15w500, color: colors.blue },
  headerTitle: { ...ApplicationStyle.f15w500, color: colors.black },
  listItemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  headerRightContainer: { flex: 1, paddingHorizontal: 5 },
  itemTitle: {
    color: colors.black,
    ...ApplicationStyle.f15w400,
  },
  searchBarContainer: {
    marginVertical: 5,
  },
});

export default SelectionModal;
