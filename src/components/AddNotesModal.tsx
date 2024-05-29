import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import TextInputField from './TextInputField';
import { colors } from '../themes';
import ActionButton from './ActionButton';
import { UserData } from '../navigation/types';

type AddNotesModal = {
  isVisible: boolean;
  selected: UserData;
  onPressAdd: ({
    notesTitle,
    notesDesc,
  }: {
    notesTitle: string;
    notesDesc: string;
  }) => void;
  closeModal: () => void;
  onPressDelete: () => void;
};

const AddNotesModal = (props: AddNotesModal) => {
  const { isVisible, selected, onPressAdd, closeModal, onPressDelete } = props;
  const [notesTitle, setNotesTitle] = useState('');
  const [notesDesc, setNotesDesc] = useState('');

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setNotesTitle(selected.title!);
      setNotesDesc(selected.description!);
    }
  }, [selected]);

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
        <ActionButton
          title={Object.keys(selected).length > 0 ? 'Edit' : 'Add'}
          mainContainerStyle={{ backgroundColor: colors.black }}
          onPress={() =>
            onPressAdd({ notesTitle: notesTitle, notesDesc: notesDesc })
          }
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
});

export default AddNotesModal;
