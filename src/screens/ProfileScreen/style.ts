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
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : statusBarHeight * 0.3,
  },
  headerTitle: {
    color: colors.black,
    ...ApplicationStyle.f17w500,
  },
  imgContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImg: { height: 150, width: 150, borderRadius: 10 },
  contentContainer: {
    backgroundColor: colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  panelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  panelTitle: {
    ...ApplicationStyle.f16w400,
    color: colors.black,
  },
  valueContainer: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderRadius: 1,
    borderLeftColor: colors.grey,
  },
  valueText: {
    ...ApplicationStyle.f16w400,
    color: colors.blue,
  },
  separator: {
    height: 1,
    backgroundColor: colors.grey,
    borderRadius: 10,
    opacity: 0.5,
  },
  signOutButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  signOutTitle: {
    ...ApplicationStyle.f17w500,
  },
});

export default styles;
