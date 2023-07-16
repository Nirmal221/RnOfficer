import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../themes/Colors';

const Separator = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: colors.grey,
  },
});

export default Separator;
