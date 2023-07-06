import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/vacation";

export const addVacationApi = async (formData) => {
    return axios.post(serverUrl + "/", formData);
};

export const getVacationApi = async (query) => {
    return axios.get(`${serverUrl}/getVacation?${query}`);
};

export const deleteVacationApi = async (id) => {
    return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateVacationApi =  async (id, formData) => {
    return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};

