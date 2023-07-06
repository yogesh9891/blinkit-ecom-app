import axios from "axios";
import { axiosApiInstance } from "../../App";
import { url } from "./url.service";

const serverUrl = url + "/wallet";

export const addAmountToWallet = (id, formdata) => {
    console.log(`${serverUrl}/addAmountToWallet`)
    return axiosApiInstance.post(`${serverUrl}/addAmountToWallet/${id}`, formdata);
};


export const addAmountToWalletCallback = (id, query) => {
    console.log(`${serverUrl}/addAmountToWallet`)
    return axiosApiInstance.get(`${serverUrl}/addAmountToWalletCallback/${id}?${query}`);
};

export const getUserWalletApi = (id, query) => {
    console.log(`${serverUrl}/getUserWallet?level`)
    return axiosApiInstance.get(`${serverUrl}/getUserWallet/${id}?${query}`);
};


