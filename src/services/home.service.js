import axios from 'axios';
import {axiosApiInstance} from '../../App';
import {url} from './url.service';

export const getOffersApi = formdata => {
  // console.log(`${serverUrl}/addcreateOrderToCart?level=1`)
  return axiosApiInstance.get(`${url}/offer?${formdata}`);
};

export const getSalessApi = formdata => {
  // console.log(`${serverUrl}/addcreateOrderToCart?level=1`)
  return axiosApiInstance.get(`${url}/sale?${formdata}`);
};

export const getBrandApi = formdata => {
  // console.log(`${serverUrl}/addcreateOrderToCart?level=1`)
  return axiosApiInstance.get(`${url}/brand/getBrand?${formdata}`);
};

export const getHomePageApi = formdata => {
  // console.log(`${serverUrl}/addcreateOrderToCart?level=1`)
  return axiosApiInstance.get(`${url}/HomePage/getHomePage?${formdata}`);
};

export const getHomeApi = (storeId,query=null) => {
  return axiosApiInstance.get(`${url}/HomePage/getHome/${storeId}?${query}`);
};
