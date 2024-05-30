import { Platform, StyleSheet } from 'react-native';
import { colors, statusBarHeight, ApplicationStyle } from '../../themes';

const style = (theme: boolean) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme ? colors.secondary : colors.black,
    },
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: theme ? colors.background : colors.black,
    },
    headerContainer: {
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS === 'ios' ? 0 : statusBarHeight * 0.3,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondary,
    },
    headerTitle: {
      color: theme ? colors.black : colors.secondary,
      ...ApplicationStyle.f17w500,
    },
    imgContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImg: { height: 150, width: 150, borderRadius: 10 },
    contentContainer: {
      backgroundColor: colors.secondary,
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
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
    profileButton: {
      borderBottomEndRadius: 0,
      borderBottomStartRadius: 0,
      paddingTop: 15,
      paddingHorizontal: 18,
      paddingBottom: 0,
    },
    buttonContainer: {
      backgroundColor: colors.secondary,
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginTop: 10,
    },
    buttonTitle: {
      color: colors.black,
      ...ApplicationStyle.f17w500,
    },
    profileTitle: {
      paddingTop: 10,
      textAlign: 'center',
      ...ApplicationStyle.f20w600,
      color: colors.blue,
    },
  });

export default style;
