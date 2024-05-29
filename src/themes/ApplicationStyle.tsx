import { StyleSheet } from 'react-native';
import { Fonts } from './Fonts';
import colors from './Colors';

const ApplicationStyle = StyleSheet.create({
  rowAlignCenter: { flexDirection: 'row', alignItems: 'center' },
  alignJustifyCenter: { alignItems: 'center', justifyContent: 'center' },
  rowAlignCenterJustifyBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  f12w400: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Fonts.type.POPPINS_SEMI_BOLD,
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
  f16w400: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Fonts.type.POPPINS_MEDIUM,
  },
  f17w400: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: Fonts.type.POPPINS_SEMI_BOLD,
  },
  f17w500: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: Fonts.type.POPPINS_SEMI_BOLD,
  },
  f20w400: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: Fonts.type.POPPINS_BOLD,
  },
  f20w600: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Fonts.type.POPPINS_BOLD,
  },
  headerShadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default ApplicationStyle;
