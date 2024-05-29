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
  RegistrationScreen: RegistrationScreenProps;
  TalukaRegistrationScreen: RegistrationScreenProps;
};

type RegistrationScreenProps = {
  userData: UserData;
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
  id?: number;
  photo?: string;
  prefix?: string;
  photoObj?: Asset;
  first_name?: string;
  middal_name?: string;
  last_name?: string;
  dob?: string;
  email?: string;
  gender?: string;
  mobile_number?: string;
  designation_id?: number;
  specialization?: string;
  job_status?: string;
  office_address?: string;
  office_district_id?: number;
  native_district_id?: number;
  office_id_photo?: Asset;
  leaving_certificate_photo?: Asset;
  remarks?: string;
  is_approved?: number;
  approved_by?: null;
  google_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: null;
  marital_status?: string;
  alt_mobile_number?: string;
  class?: string;
  native_address?: string;
  reference_by?: string;
  displayName?: string;
  photoURL?: string;
};
