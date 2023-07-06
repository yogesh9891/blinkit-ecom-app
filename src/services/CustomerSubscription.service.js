import axios from 'axios';
import { axiosApiInstance } from '../../App';
import { generalModelStatuses } from '../utils/constant';
import { url } from './url.service';

const serverUrl = url + '/CustomerSubscription';

export const addNewSubscription = async obj => {
  return axiosApiInstance.post(`${serverUrl}/addNewSubscription`, obj);
};


export const getMySubscriptions = async (id) => {
  return axiosApiInstance.get(`${serverUrl}/getCustomerSubscriptionForComingMonth/${id}`);
};
