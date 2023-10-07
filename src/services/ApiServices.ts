import axios from 'axios';
import { UserData } from '../navigation/types';

const ApiConstant = {
  BASE_URL: 'https://patidarkarmyogi.saranginfotech.in/api/',
  REGISTER: 'register',
  DISTRICTS: 'districts',
  DESIGNATIONS: 'designations',
  OFFICER_LIST: 'officer-list',
  LOGIN: 'login',
};

export type EndPointProps = '';

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
  const FormData = require('form-data');
  let formData = new FormData();
  formData.append('google_id', id);
  formData.append('email', gmail);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: {},
    data: formData,
  };

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

const postWithFormData = (endPoint: string, data: UserData) => {
  const FormData = require('form-data');
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
  // formData.append('office_id_photo', {
  //   fileSize: data.office_id_photo?.fileSize,
  //   height: data.office_id_photo?.height,
  //   uri:
  //     Platform.OS === 'android'
  //       ? data.office_id_photo?.uri
  //       : data.office_id_photo?.uri.replace('file://', ''),
  //   type: data.office_id_photo?.type,
  //   fileName: data.office_id_photo?.fileName,
  //   width: data.office_id_photo?.width,
  // });
  // formData.append('leaving_certificate_photo', {
  //   fileSize: data.leaving_certificate_photo.fileSize,
  //   height: data.leaving_certificate_photo.height,
  //   uri:
  //     Platform.OS === 'android'
  //       ? data.leaving_certificate_photo.uri
  //       : data.leaving_certificate_photo.uri.replace('file://', ''),
  //   type: data.leaving_certificate_photo.type,
  //   fileName: data.leaving_certificate_photo.fileName,
  //   width: data.leaving_certificate_photo.width,
  // });

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

export { ApiConstant, api, get, post, postCheckUser, postWithFormData };
