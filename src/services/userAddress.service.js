import axios from "axios";
import { axiosApiInstance } from "../../App";
import { url } from "./url.service";
const serverUrl = url + "/userAddress";

export const getUserAddresses = async (query) => {
    console.log(`${url}/userAddress?${query}`,"userAddresss urrl")
    return axiosApiInstance.get(`${url}/userAddress?${query}`);
}

export const getAddressFromLocation = async (formData) => {
    return axiosApiInstance.post(`${url}/userAddress/get-address-from-lat-long`,formData);
}

export const addAddressApi = async (formData) => {
    return axiosApiInstance.post(`${serverUrl}/`,formData);
}

export const updateAddressApi = async (id,formData) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`,formData);
}
export const deleteAddressApi = async (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
}

export const getAddressApi = async (query) => {

    console.log(`${serverUrl}/?${query}`,"useradddress api")
    return axiosApiInstance.get(`${serverUrl}/?${query}`);
}