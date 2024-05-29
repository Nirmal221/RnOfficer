import { Platform, StyleSheet } from 'react-native';
import { colors, ApplicationStyle, width, height } from '../../themes';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    backgroundColor: colors.secondary,
  },
  searchContainer: {
    marginBottom: 10,
    paddingHorizontal: 12,
    ...ApplicationStyle.rowAlignCenterJustifyBetween,
  },
  searchTextInput: {
    flex: 0.98,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    fontSize: 15,
  },
  filterIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 100,
    marginTop: 10,
  },
  loaderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyListContainer: {
    height: height * 0.9,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonContainer: {
    position: 'absolute',
    height: 45,
    width: 45,
    bottom: 10,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: colors.black,
    ...ApplicationStyle.alignJustifyCenter,
  },
});

export default styles;
