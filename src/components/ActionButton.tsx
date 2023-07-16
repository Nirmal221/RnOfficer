import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import colors from '../themes/Colors';

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
    fontSize: 18,
    fontWeight: '500',
    color: colors.secondary,
  },
});

export default ActionButton;
