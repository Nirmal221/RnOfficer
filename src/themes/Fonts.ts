import { Platform } from 'react-native';

const type = {
  POPPINS_SEMI_BOLD: Platform.OS === 'ios' ? 'Poppins' : 'PoppinsSemiBold',
  POPPINS_BOLD: Platform.OS === 'ios' ? 'Poppins' : 'PoppinsBold',
  POPPINS_MEDIUM: Platform.OS === 'ios' ? 'Poppins' : 'PoppinsMedium',
};

const Fonts = {
  type,
};

export { Fonts };
