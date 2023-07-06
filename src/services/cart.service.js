import axios from 'axios';
import {axiosApiInstance} from '../../App';
import {url} from './url.service';

const serverUrl = url + '/userCart';

export const addToCartApi = (id, formdata) => {
  console.log(`${serverUrl}/addToCart?level=1&${id}`);
  return axiosApiInstance.post(`${serverUrl}/addToCart/${id}`, formdata);
};

export const addQuantityinToCartApi = (id, formdata) => {
  return axiosApiInstance.patch(`${serverUrl}/increaseQuantity/${id}`, formdata);
};

export const removeQuantityinToCartApi = (id, formdata) => {
  return axiosApiInstance.patch(`${serverUrl}/decrementProductQuantity/${id}`, formdata);
};

export const removeProductfromCartApi = (id, formdata) => {
  console.log(`${serverUrl}/removeProduct?level=1&${query}`);
  return axiosApiInstance.patch(`${serverUrl}/removeProduct/${id}`, formdata);
};

export const getCartApi = (id, formdata) => {
  // console.log(`${serverUrl}/decrementProductQuantity?level=1&${query}`)
  return axiosApiInstance.get(`${serverUrl}/`);
};
