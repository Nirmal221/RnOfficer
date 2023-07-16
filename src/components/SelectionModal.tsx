import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from './Separator';

type SelectionModalProp = {
  visible: boolean;
  data: Array<object>;
  onClose: () => void;
  onSelect: (selected: {}) => undefined;
};

const SelectionModal = ({
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
          <TouchableOpacity onPress={() => onClose()}>
            <Text style={styles.headerTitle}>Close</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          style={styles.mainContainer}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item, index }: { item: { title: string } }) => {
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
  },
  headerTitle: { fontSize: 15 },
  listItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
});

export default SelectionModal;
