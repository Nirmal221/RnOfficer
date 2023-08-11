import React from 'react';
import colors from '../themes/Colors';
import { statusBarHeight } from '../themes';
import { Platform, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ApplicationStyle from '../themes/ApplicationStyle';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.green]}
      style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 1,
    elevation: 5,
    marginBottom: 10,
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight * 0.3,
  },
  headerTitle: {
    paddingBottom: 10,
    color: colors.black,
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    ...ApplicationStyle.f15w600,
  },
});

export default Header;
