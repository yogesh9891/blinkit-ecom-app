import axios from 'axios';
import { axiosApiInstance } from '../../App';
import { url } from './url.service';

let serverUrl = `${url}/product`;
let serverUrl2 = `${url}/productInternalOrder`;

export const getAllProducts = async query => {
  console.log(`${serverUrl}/getProducts/?limit=5&${query}`);
  return axiosApiInstance.get(`${serverUrl}/getProducts/?limit=5&${query}`);
};

export const getProductById = async id => {
  return axiosApiInstance.get(`${serverUrl}/getProductById/${id}`);
};
export const getProductsForSubscriptionFromProductStockByStoreId = async (id,query) => {
  console.log(`${serverUrl}/getProductsForSubscriptionFromProductStockByStoreId/${id}?${query}`)
  return axiosApiInstance.get(`${serverUrl}/getProductsForSubscriptionFromProductStockByStoreId/${id}?${query}`);
};

export const getAllProductByUser = async query => {
  console.log(`${serverUrl}/getAllStoreOrderProduct/?limit=5&${query}`, 'ADASDASD');
  return axiosApiInstance.get(`${serverUrl2}/getAllStoreOrderProduct/?limit=50&${query}`);
};

export const getSingleStoreProduct = async id => {
  console.log(`${serverUrl}/getSingleStoreProduct/?limit=5&${id}`);
  return axiosApiInstance.get(`${serverUrl2}/getSingleStoreProduct/${id}`);
};

export const getProductReviews = async query => {
  return axiosApiInstance.get(`${url}/productReview/getReviewOfProduct?${query}`);
};
