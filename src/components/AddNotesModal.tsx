import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import TextInputField from './TextInputField';
import { colors } from '../themes';
import ActionButton from './ActionButton';
import { UserData } from '../navigation/types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RenderPanel from './RenderPanel';
import moment from 'moment';

type AddNotesModal = {
  isVisible: boolean;
  selected: UserData;
  onPressAdd: ({
    title,
    description,
    date,
  }: {
    title: string;
    description: string;
    date: string;
  }) => void;
  closeModal: () => void;
  onPressDelete: () => void;
};

const AddNotesModal = (props: AddNotesModal) => {
  const { isVisible, selected, onPressAdd, closeModal, onPressDelete } = props;
  const [notesTitle, setNotesTitle] = useState('');
  const [notesDesc, setNotesDesc] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [createdDate, setCreatedDate] = useState(new Date());

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setNotesTitle(selected.title!);
      setNotesDesc(selected.description!);
      setCreatedDate(new Date(selected.date!));
    }
  }, [selected]);

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setCreatedDate(date);
    hideDatePicker();
  };

  return (
    <Modal
      hasBackdrop
      avoidKeyboard
      animationIn={'slideInUp'}
      isVisible={isVisible}
      style={styles.mainContainer}
      onBackdropPress={closeModal}>
      <View style={styles.container}>
        <TextInputField
          value={notesTitle}
          onChangeText={setNotesTitle}
          placeholder={'Please Add Notes Title'}
          containerStyle={styles.textInput}
        />
        <TextInputField
          value={notesDesc}
          onChangeText={setNotesDesc}
          placeholder={'Please Add Notes Description'}
          containerStyle={styles.textInput}
        />
        <RenderPanel
          value={moment(createdDate).format('DD/MM/YYYY')}
          valueTextStyle={styles.panelValue}
          onPress={() => showDatePicker()}
        />
        <ActionButton
          title={Object.keys(selected).length > 0 ? 'Edit' : 'Add'}
          mainContainerStyle={{ backgroundColor: colors.black }}
          onPress={() => {
            const obj = {
              title: notesTitle,
              description: notesDesc,
              date: `${createdDate}`,
            };
            onPressAdd(obj);
          }}
        />
        {Object.keys(selected).length > 0 && (
          <ActionButton
            title="Delete"
            mainContainerStyle={{
              backgroundColor: colors.black,
              marginVertical: 10,
            }}
            onPress={() => onPressDelete()}
          />
        )}
        {isDatePickerVisible && (
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.secondary,
  },
  textInput: {
    marginBottom: 10,
  },
  panelValue: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
});

export default AddNotesModal;
