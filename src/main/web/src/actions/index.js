import {
	SET_USER_PROFILES,
	GET_USER_PROFILE,
	SET_USER_PROFILE,
	ADD_USER_PROFILE,
	DELETE_USER_PROFILE,
	UPDATE_USER_PROFILE,
	SET_FETCH_ERROR,
	SET_ADD_ERROR,
	SET_UPLOAD_ERROR,
} from "../constants/types";

export const setUserProfiles = (users) => ({
	type: SET_USER_PROFILES,
	payload: users,
});

export const addUserProfile = (user) => ({
	type: ADD_USER_PROFILE,
	payload: user,
});

export const getUserProfile = (userId) => ({
	type: GET_USER_PROFILE,
	payload: userId,
});

export const setUserProfile = (user) => ({
	type: SET_USER_PROFILE,
	payload: user,
});

export const deleteUserProfile = (userId) => ({
	type: DELETE_USER_PROFILE,
	payload: userId,
});

export const updateUserProfile = (user) => ({
	type: UPDATE_USER_PROFILE,
	payload: user,
});

export const setFetchError = (err) => ({
	type: SET_FETCH_ERROR,
	payload: err,
});

export const setAddError = (err) => ({
	type: SET_ADD_ERROR,
	payload: err,
});

export const setUploadError = (err) => ({
	type: SET_UPLOAD_ERROR,
	payload: err,
});
