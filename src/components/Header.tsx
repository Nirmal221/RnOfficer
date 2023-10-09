import React from 'react';
import colors from '../themes/Colors';
import { statusBarHeight } from '../themes';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ApplicationStyle from '../themes/ApplicationStyle';
import { AppIcons } from '../assets';

type HeaderProps = {
  title: string;
  showLeftArrow?: boolean;
  onPressBackArrow: () => void;
};

const Header = ({ title, showLeftArrow, onPressBackArrow }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {showLeftArrow && (
        <TouchableOpacity onPress={onPressBackArrow}>
          <AppIcons.BackArrow />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.secondary,
    marginBottom: 10,
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight * 0.3,
    flexDirection: 'row',
    ...ApplicationStyle.headerShadow,
  },
  headerTitle: {
    flex: 1,
    paddingRight: 30,
    paddingBottom: 10,
    color: colors.black,
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    ...ApplicationStyle.f15w600,
  },
});

export default Header;
