import { Platform, StyleSheet } from 'react-native';
import { colors, ApplicationStyle, width, height } from '../../themes';

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
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: Platform.OS === 'ios' ? 15 : 5,
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
  contentContainerStyle: {
    paddingBottom: 100,
  },
  loaderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyListContainer: {
    height: height * 0.8,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
