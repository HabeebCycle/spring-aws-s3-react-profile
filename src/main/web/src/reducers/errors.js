import {
	SET_FETCH_ERROR,
	SET_ADD_ERROR,
	SET_UPLOAD_ERROR,
} from "../constants/types";

const initialState = {
	fetchError: null,
	addError: null,
	uploadError: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_FETCH_ERROR:
			return {
				...state,
				fetchError: action.payload,
			};

		case SET_ADD_ERROR:
			return {
				...state,
				addError: action.payload,
			};

		case SET_UPLOAD_ERROR:
			return {
				...state,
				uploadError: action.payload,
			};

		default:
			return state;
	}
};
