import { StyleSheet } from 'react-native';
import { colors, ApplicationStyle } from '../../themes';

const style = (theme: boolean) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme ? colors.secondary : colors.black,
    },
    container: {
      flex: 1,
      paddingHorizontal: 30,
      paddingBottom: 50,
      justifyContent: 'flex-end',
      backgroundColor: theme ? colors.secondary : colors.black,
    },
    loginButton: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: theme ? colors.secondary : colors.secondaryLight,
      shadowColor: '#000',
      paddingHorizontal: 15,
      paddingVertical: 10,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    googleLogo: {
      marginRight: 5,
      height: 30,
      width: 30,
    },
    loginTitle: {
      ...ApplicationStyle.f15w400,
      color: theme ? colors.black : colors.secondary,
    },
  });

export default style;
