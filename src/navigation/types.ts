import { Asset } from 'react-native-image-picker';

export type AppStackParamList = {
  TabStack: undefined;
  HomeScreen: undefined;
  OfficerListScreen: { cityObj: DistrictsObject };
  ProfileScreen: undefined;
  RegistrationScreen: RegistrationScreenProps;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  ResetPassword: undefined;
  ForgotPassword: undefined;
  RegistrationScreen: RegistrationScreenProps;
  TalukaRegistrationScreen: RegistrationScreenProps;
};

type RegistrationScreenProps = {
  userData?: UserData;
  isEdit?: boolean;
};

export type RootStackParamList = {
  AuthStack: undefined;
  SplashScreen: undefined;
  AppStackScreens: undefined;
};

export type DistrictsObject = {
  created_at?: string;
  id?: number;
  name?: string;
  updated_at?: string;
};

export type DesignationObject = {
  created_at?: string;
  id?: number;
  name?: string;
  updated_at?: string;
};

export type UserData = {
  title?: string;
  description?: string;
  date?: string;
  username?: string;
};
