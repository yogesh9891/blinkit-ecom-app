import axios from 'axios';
import {axiosApiInstance} from '../../App';
import {generalModelStatuses} from '../utils/constant';
import {url} from './url.service';

const serverUrl = url + '/category';

export const getParentCategoriesApi = query => {
  console.log(`${serverUrl}/getCategory?level=1&status=${generalModelStatuses.APPROVED}&${query}`);
  return axiosApiInstance.get(`${serverUrl}/getCategory?level=1&${query}`);
};

export const getNestedCategoriesApi = query => {
  console.log(`${serverUrl}/getCategory?level=1&${query}`);
  return axiosApiInstance.get(`${serverUrl}/getNestedCategories?level=1&status=${generalModelStatuses.APPROVED}&${query}`);
};

export const getChildCategoryByParentIdApi = id => {
  console.log(`${serverUrl}/getChildCategory/${id}`);
  return axiosApiInstance.get(`${serverUrl}/getChildCategory/${id}`);
};

export const getServiceApi = query => {
  return axiosApiInstance.get(`${url}/service/getServices?${query}`);
};
