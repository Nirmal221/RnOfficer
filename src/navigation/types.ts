export type AppStackParamList = {
  TabStack: undefined;
  HomeScreen: undefined;
  OfficerListScreen: { cityObj: DistrictsObject };
  ProfileScreen: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegistrationScreen: { userData: any };
};

export type RootStackParamList = {
  AuthStack: undefined;
  SplashScreen: undefined;
  AppStackScreens: undefined;
};

export type DistrictsObject = {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
};

export type UserData = {
  id?: number;
  photo?: string;
  prefix?: string;
  first_name?: string;
  middal_name?: string;
  last_name?: string;
  dob?: null;
  email?: string;
  mobile_number?: string;
  designation_id?: number;
  specialization?: null;
  job_status?: string;
  office_address?: string;
  office_district_id?: number;
  native_district_id?: number;
  office_id_photo?: string;
  leaving_certificate_photo?: string;
  remarks?: null;
  is_approved?: number;
  approved_by?: null;
  google_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: null;
};
