import axios from "axios";
import { axiosApiInstance } from "../../App";
import { url } from "./url.service";

const serverUrl = url + "/userOrder";

export const createOrderApi = (formdata) => {
    console.log(`${serverUrl}/addcreateOrderToCart?level=1`)

    return axiosApiInstance.post(`${serverUrl}/createOrder/`,formdata);
};

export const getUserOrderApi = (query) => {
    console.log(`${serverUrl}/getOrder?level=1`)
    return axiosApiInstance.get(`${serverUrl}/?${query}`);
};

export const getUserSingleOrderApi = (id) => {
    console.log(`${serverUrl}/getOrder?level=1`)
    return axiosApiInstance.get(`${serverUrl}/getOrder/${id}`);
};


export const paymentCallback = (id,query) => {
    return axiosApiInstance.get(`${serverUrl}/paymentCallback/${id}?${query}`);
};