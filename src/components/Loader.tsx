import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors, height, width } from '../themes';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator color={colors.secondary} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Loader;
