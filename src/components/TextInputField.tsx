import React, { useContext } from 'react';
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
import { Context } from '../AppContext/AppContext';
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
  secureTextEntry?: boolean;
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
  secureTextEntry = false,
  placeholderTextColor = colors.grey,
  onChangeText,
}: TextInputFieldProps) => {
  const { theme } = useContext(Context);
  const styles = style(theme === 'light');
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.titleText}>{title}</Text>}
      <TextInput
        value={value}
        editable={editable}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
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

const style = (theme: boolean) =>
  StyleSheet.create({
    container: {},
    textInput: {
      borderWidth: 0.5,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderColor: theme ? colors.black : colors.secondary,
      backgroundColor: theme ? colors.secondary : colors.black,
      color: theme ? colors.black : colors.secondary,
      borderStyle: 'dashed',
      ...ApplicationStyle.f15w400,
    },
    titleText: {
      ...ApplicationStyle.f15w500,
      lineHeight: 30,
      color: theme ? colors.black : colors.secondary,
    },
  });

export default TextInputField;
