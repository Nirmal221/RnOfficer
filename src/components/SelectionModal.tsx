import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Separator from './Separator';
import colors from '../themes/Colors';
import ApplicationStyle from '../themes/ApplicationStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

type SelectionModalProp = {
  title: string;
  visible: boolean;
  data: Array<object>;
  onClose: () => void;
  onSelect: (selected: {}) => undefined;
};

const SelectionModal = ({
  title,
  visible,
  onClose,
  data,
  onSelect,
}: SelectionModalProp) => {
  return (
    <Modal
      visible={visible}
      style={styles.mainContainer}
      presentationStyle="formSheet"
      animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => onClose()} style={{ flex: 1 }}>
            <Text style={styles.headerLeftTitle}>Close</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: 15,
              alignItems: 'center',
            }}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 5 }} />
        </View>
        <FlatList
          data={data}
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }: { item: { title: string } }) => {
            return (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => onSelect(item)}>
                <Text style={styles.itemTitle}>{item.title}</Text>
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
  headerLeftTitle: { ...ApplicationStyle.f15w500, color: colors.red },
  headerTitle: { ...ApplicationStyle.f15w500, color: colors.blue },
  listItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemTitle: {
    ...ApplicationStyle.f15w400,
  },
});

export default SelectionModal;
