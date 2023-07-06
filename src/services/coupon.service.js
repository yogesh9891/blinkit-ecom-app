import axios from 'axios';
import {axiosApiInstance} from '../../App';
import {url} from './url.service';

const serverUrl = url + '/coupon';

export const getCouponApi = (query) => {
  return axiosApiInstance.get(`${serverUrl}?${query}`);
};

export const applyCouponApi = (formData) => {
  return axiosApiInstance.post(`${serverUrl}/checkValidCoupon/`,formData);
};
