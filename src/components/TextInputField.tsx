import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from '../themes/Colors';

type TextInputFieldProps = {
  value: string;
  title: string;
  placeholder: string;
  maxLength?: number;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
};

const TextInputField = ({
  value,
  title,
  maxLength,
  editable = true,
  placeholder,
  keyboardType = 'default',
  onChangeText,
}: TextInputFieldProps) => {
  return (
    <View>
      {title && <Text style={styles.titleText}>{title}</Text>}
      <TextInput
        value={value}
        editable={editable}
        placeholder={placeholder}
        maxLength={maxLength}
        keyboardType={keyboardType}
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
  titleText: { fontSize: 15, fontWeight: '600', lineHeight: 30 },
});

export default TextInputField;
