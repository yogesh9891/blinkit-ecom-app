import axios from 'axios';
import {axiosApiInstance} from '../../App';
import {url} from './url.service';

const serverUrl = url + '/users';

export const loginApi = formData => {
  console.log(serverUrl + '/userLogin', formData);
  return axios.post(serverUrl + '/userLogin', formData);
};

export const sendOtpApi = formData => {
  return axios.post(serverUrl + '/send-otp', formData);
};

export const verifyOtpApi = formData => {
  return axios.post(serverUrl + '/verify-otp', formData);
};

export const userUpdateApi = (id, formData) => {
  return axios.patch(serverUrl + `/updateUser/${id}`, formData);
};

export const getuserbyIdApi = id => {
  return axios.get(serverUrl + `/getById/${id}`);
};

export const getStoreApi = query => {
  return axios.get(`${serverUrl}/getUser?${query}`);
};

export const findNearStoreApi = formData => {
  console.log(`${serverUrl}/findNearStore   `, 'nsdfjsdhfjadshfdsfsdfasjdfasdfsdfsdfsdfsdfsdfsad', formData);
  return axios.post(`${serverUrl}/findNearStore`, formData);
};
