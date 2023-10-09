import React from 'react';
import colors from '../themes/Colors';
import ApplicationStyle from '../themes/ApplicationStyle';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type ActionButtonProps = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  mainContainerStyle: ViewStyle;
};

const ActionButton = ({
  title,
  disabled = false,
  onPress,
  mainContainerStyle,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.mainContainer,
        mainContainerStyle,
        disabled && styles.disableContainer,
      ]}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  disableContainer: {
    backgroundColor: colors.grey,
  },
  titleText: {
    color: colors.secondary,
    ...ApplicationStyle.f15w500,
  },
});

export default ActionButton;
