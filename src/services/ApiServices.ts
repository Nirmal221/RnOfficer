import axios from 'axios';
import { Platform } from 'react-native';
import { UserData } from '../navigation/types';

const ApiConstant = {
  BASE_URL: 'https://patidarkarmyogi.saranginfotech.in/api/',
  BASE_URL_IMAGE: 'https://patidarkarmyogi.saranginfotech.in/users/',
  REGISTER: 'register',
  DISTRICTS: 'districts',
  DESIGNATIONS: 'designations',
  OFFICER_LIST: 'officer-list',
  LOGIN: 'login',
  EDIT_PROFILE: 'edit-profile',
};

const api = axios.create({
  baseURL: ApiConstant.BASE_URL,
  timeout: 3000,
});

const get = (endPoint: string) => {
  return new Promise((resolve, reject) => {
    api
      .get(endPoint)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

const post = (endPoint: string, params: any) => {
  return new Promise((resolve, reject) => {
    api
      .post(`${endPoint}`, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postCheckUser = (endPoint: string, id: any, gmail: string) => {
  let formData = new FormData();
  formData.append('google_id', id);
  formData.append('email', gmail);
  return new Promise((resolve, reject) => {
    api
      .post(`${endPoint}`, formData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

const postWithFormData = (endPoint: string, data: UserData) => {
  let formData = new FormData();
  formData.append('photo', data.photo);
  formData.append('google_id', data.google_id);
  formData.append('prefix', data.prefix);
  formData.append('first_name', data.first_name);
  formData.append('middal_name', data.middal_name);
  formData.append('last_name', data.last_name);
  formData.append('gender', data.gender);
  formData.append('marital_status', data.marital_status);
  formData.append('dob', data.dob);
  formData.append('email', data.email);
  formData.append('mobile_number', data.mobile_number);
  formData.append('alt_mobile_number', data.alt_mobile_number);
  formData.append('designation_id', data.designation_id);
  formData.append('job_status', data.job_status);
  formData.append('office_address', data.office_address);
  formData.append('class', data.class);
  formData.append('office_district_id', data.office_district_id);
  formData.append('native_district_id', data.native_district_id);
  formData.append('native_address', data.native_address);
  formData.append('specialization', data.specialization);
  formData.append('reference_by', data.reference_by);
  formData.append('remarks', data.remarks);
  formData.append('office_id_photo', {
    uri:
      Platform.OS === 'android'
        ? data.office_id_photo?.uri
        : data?.office_id_photo?.uri.replace('file://', ''),
    type: data.office_id_photo?.type,
    name: data.office_id_photo?.fileName,
  });
  formData.append('leaving_certificate_photo', {
    uri:
      Platform.OS === 'android'
        ? data?.leaving_certificate_photo?.uri
        : data?.leaving_certificate_photo?.uri?.replace('file://', ''),
    type: data?.leaving_certificate_photo?.type,
    name: data?.leaving_certificate_photo?.fileName,
  });

  return new Promise((resolve, reject) => {
    api
      .post(endPoint, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

const postUpdateRegistration = (endPoint: string, data: UserData) => {
  let formData = new FormData();
  formData.append('photo', {
    uri:
      Platform.OS === 'android'
        ? data?.photoObj?.uri
        : data?.photoObj?.uri?.replace('file://', ''),
    type: data?.photoObj?.type,
    name: data?.photoObj?.fileName,
  });
  formData.append('google_id', data.google_id);
  formData.append('prefix', data.prefix);
  formData.append('first_name', data.first_name);
  formData.append('middal_name', data.middal_name);
  formData.append('last_name', data.last_name);
  formData.append('gender', data.gender);
  formData.append('marital_status', data.marital_status);
  formData.append('dob', data.dob);
  formData.append('email', data.email);
  formData.append('mobile_number', data.mobile_number);
  formData.append('alt_mobile_number', data.alt_mobile_number);
  formData.append('designation_id', data.designation_id);
  formData.append('job_status', data.job_status);
  formData.append('office_address', data.office_address);
  formData.append('class', data.class);
  formData.append('office_district_id', data.office_district_id);
  formData.append('native_district_id', data.native_district_id);
  formData.append('native_address', data.native_address);
  formData.append('specialization', data.specialization);
  formData.append('reference_by', data.reference_by);
  formData.append('remarks', data.remarks);

  return new Promise((resolve, reject) => {
    api
      .post(endPoint, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export {
  ApiConstant,
  api,
  get,
  post,
  postCheckUser,
  postWithFormData,
  postUpdateRegistration,
};
