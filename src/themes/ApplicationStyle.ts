import { StyleSheet } from 'react-native';
import { Fonts } from './Fonts';

const ApplicationStyle = StyleSheet.create({
  rowAlignCenter: { flexDirection: 'row', alignItems: 'center' },
  rowAlignCenterJustifyBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  f14w400: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.type.POPPINS_SEMI_BOLD,
  },
  f15w600: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.type.POPPINS_BOLD,
  },
  f15w400: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: Fonts.type.POPPINS_MEDIUM,
  },
  f15w500: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Fonts.type.POPPINS_SEMI_BOLD,
  },
  f17w500: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: Fonts.type.POPPINS_SEMI_BOLD,
  },
  f20w600: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Fonts.type.POPPINS_BOLD,
  },
});

export default ApplicationStyle;
