import React from 'react';
import {
  ColorValue,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../themes/Colors';
import ApplicationStyle from '../themes/ApplicationStyle';

type TextInputFieldProps = {
  value: string;
  title?: string;
  placeholder: string;
  maxLength?: number;
  editable?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholderTextColor?: ColorValue;
  textInputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onChangeText: (text: string) => void;
};

const TextInputField = ({
  value,
  title,
  maxLength,
  editable = true,
  multiline = false,
  placeholder,
  keyboardType = 'default',
  textInputStyle,
  containerStyle,
  placeholderTextColor = colors.grey,
  onChangeText,
}: TextInputFieldProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.titleText}>{title}</Text>}
      <TextInput
        value={value}
        editable={editable}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        maxLength={maxLength}
        keyboardType={keyboardType}
        onChangeText={text => onChangeText(text)}
        style={[styles.textInput, textInputStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textInput: {
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: colors.black,
    backgroundColor: colors.secondary,
    ...ApplicationStyle.f15w400,
  },
  titleText: { ...ApplicationStyle.f15w500, lineHeight: 30 },
});

export default TextInputField;
