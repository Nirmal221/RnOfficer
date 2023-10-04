import { Platform, StyleSheet } from 'react-native';
import { colors, ApplicationStyle, width } from '../../themes';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
  },
  headerContainer: {
    paddingBottom: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    ...ApplicationStyle.headerShadow,
  },
  headerTitle: {
    color: colors.black,
    ...ApplicationStyle.f17w500,
  },
  searchTextInput: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    fontSize: 15,
    marginBottom: 10,
  },
  cityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityLabel: { ...ApplicationStyle.f15w600, color: colors.black },
  linearGradient: {
    width: width * 0.45,
    height: width * 0.1,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  columnWrapperStyle: { justifyContent: 'space-between' },
});

export default styles;
