import React from 'react';
import colors from '../themes/Colors';
import ApplicationStyle from '../themes/ApplicationStyle';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  mainContainerStyle: ViewStyle;
};

const ActionButton = ({
  title,
  onPress,
  mainContainerStyle,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainContainer, mainContainerStyle]}>
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
  titleText: {
    ...ApplicationStyle.f17w500,
    color: colors.secondary,
  },
});

export default ActionButton;
