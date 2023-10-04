import { Platform, StyleSheet } from 'react-native';
import { colors, statusBarHeight, ApplicationStyle } from '../../themes';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.secondary,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.black,
    ...ApplicationStyle.f17w500,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight * 0.3,
    paddingBottom: 5,
    backgroundColor: colors.secondary,
  },
  headerLeftContainer: {
    paddingLeft: 12,
    paddingVertical: 5,
  },
  headerRightContainer: { paddingHorizontal: 15 },
  searchTextInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: colors.grey,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    marginBottom: 10,
    ...ApplicationStyle.f14w400,
  },
  loaderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default styles;
