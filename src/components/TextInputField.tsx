import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../themes/Colors';

type TextInputFieldProps = {
  value: string;
  placeholder: string;
  maxLength?: number;
  onChangeText: (text: string) => void;
};

const TextInputField = ({
  value,
  maxLength,
  placeholder,
  onChangeText,
}: TextInputFieldProps) => {
  return (
    <View>
      <TextInput
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChangeText={text => onChangeText(text)}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textInput: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
});

export default TextInputField;
