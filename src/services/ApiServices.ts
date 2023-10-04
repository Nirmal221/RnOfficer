import axios from 'axios';
import { UserDataObject } from '../screens/RegistrationScreen/types';

const ApiConstant = {
  BASE_URL: 'https://patidarkarmyogi.saranginfotech.in/api/',
  REGISTER: 'register',
  DISTRICTS: 'districts',
  DESIGNATIONS: 'designations',
  OFFICER_LIST: 'officer-list',
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
  // let config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: url,
  //   headers: {},
  // };
  // return new Promise((resolve, reject) => {
  //   axios
  //     .request(config)
  //     .then(response => resolve(response))
  //     .catch(error => reject(error));
  // });
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

const postCheckUser = (url: string, id: any, gmail: string) => {
  const FormData = require('form-data');
  let formData = new FormData();
  formData.append('google_id', id);
  formData.append('email', gmail);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: {},
    // headers: {
    //   ...formData.getHeaders(),
    // },
    data: formData,
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const postWithFormData = (url: string, data: UserDataObject) => {
  const FormData = require('form-data');
  let formData = new FormData();
  //   const fs = require('fs');
  //   formData.append(
  //     'photo',
  //     Platform.OS === 'android' ? data.photo : data.photo.replace('file://', ''),
  //   );
  formData.append('google_id', data.google_id);
  formData.append('prefix', data.prefix);
  formData.append('first_name', data.first_name);
  formData.append('middal_name', data.middal_name);
  formData.append('last_name', data.last_name);
  formData.append('email', data.email);
  formData.append('mobile_number', data.mobile_number);
  formData.append('designation_id', data.designation_id);
  formData.append('job_status', data.job_status);
  formData.append('office_address', data.office_address);
  formData.append('office_district_id', data.office_district_id);
  formData.append('native_district_id', data.native_district_id);
  //   formData.append(
  //     'office_id_photo',
  //     Platform.OS === 'android'
  //       ? data.office_id_photo
  //       : data.office_id_photo.replace('file://', ''),
  //   );
  //   formData.append('leaving_certificate_photo', {
  //     uri: Platform.OS === 'android',
  //       ? data.leaving_certificate_photo
  //       : data.leaving_certificate_photo.replace('file://', '')
  //   });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: {},
    // headers: {
    //   ...formData.getHeaders(),
    // },
    data: formData,
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });

  //   const formData = new FormData();
  //   formData.append('photo', {
  //     uri:
  //       Platform.OS === 'android'
  //         ? data.photo
  //         : data.photo.replace('file://', ''),
  //   });
  //   formData.append('google_id', data.google_id);
  //   formData.append('prefix', data.prefix);
  //   formData.append('first_name', data.first_name);
  //   formData.append('middal_name', data.middal_name);
  //   formData.append('last_name', data.last_name);
  //   formData.append('email', data.email);
  //   formData.append('mobile_number', data.mobile_number);
  //   formData.append('designation_id', data.designation_id);
  //   formData.append('job_status', data.job_status);
  //   formData.append('office_address', data.office_address);
  //   formData.append('office_district_id', data.office_district_id);
  //   formData.append('native_district_id', data.native_district_id);
  //   formData.append('office_id_photo', {
  //     uri:
  //       Platform.OS === 'android'
  //         ? data.office_id_photo
  //         : data.office_id_photo.replace('file://', ''),
  //   });
  //   formData.append('leaving_certificate_photo', {
  //     uri:
  //       Platform.OS === 'android'
  //         ? data.leaving_certificate_photo
  //         : data.leaving_certificate_photo.replace('file://', ''),
  //   });

  //   return new Promise((resolve, reject) => {
  //     api
  //       .post(`${endPoint}`, data)
  //       .then(res => {
  //         resolve(res);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
};

export { ApiConstant, api, get, post, postCheckUser, postWithFormData };
