import axios from "axios";
import { API_BASE_URL } from "../constants";

export const fetchAllUsers = () => {
	return axios.get(API_BASE_URL);
};

export const saveUser = (data, config) => {
	return axios.post(API_BASE_URL, data, config);
};

export const updateUser = (data, config) => {
	return axios.put(API_BASE_URL, data, config);
};

export const updateUserImage = (userId, data, config) => {
	return axios.put(`${API_BASE_URL}/${userId}`, data, config);
};

export const deleteUser = (userId) => {
	return axios.delete(`${API_BASE_URL}/${userId}`);
};
