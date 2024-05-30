import { Platform, StyleSheet } from 'react-native';
import { colors, ApplicationStyle, width, height } from '../../themes';

const style = (theme: boolean) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme ? colors.secondary : colors.black,
    },
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 0 : 10,
      backgroundColor: theme ? colors.secondary : colors.black,
    },
    searchContainer: {
      marginBottom: 10,
      paddingHorizontal: 12,
      ...ApplicationStyle.rowAlignCenterJustifyBetween,
    },
    contentContainerStyle: {
      paddingBottom: 100,
      marginTop: 10,
    },
    loaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyListContainer: {
      height: height * 0.9,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme ? colors.secondary : colors.black,
    },
    plusButtonContainer: {
      position: 'absolute',
      height: 45,
      width: 45,
      bottom: 10,
      alignSelf: 'center',
      borderRadius: 50,
      backgroundColor: theme ? colors.black : colors.secondary,
      ...ApplicationStyle.alignJustifyCenter,
    },
  });

export default style;
