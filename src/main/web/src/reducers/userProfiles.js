import {
	SET_USER_PROFILES,
	GET_USER_PROFILE,
	SET_USER_PROFILE,
	ADD_USER_PROFILE,
	DELETE_USER_PROFILE,
	UPDATE_USER_PROFILE,
} from "../constants/types";

const initialState = {
	userProfiles: [],
	userProfile: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_PROFILES:
			return {
				...state,
				userProfiles: action.payload,
			};

		case ADD_USER_PROFILE:
			return {
				...state,
				userProfiles: state.userProfiles.concat(action.payload),
			};

		case GET_USER_PROFILE:
			return {
				...state,
				userProfile: state.userProfiles.find(
					(user) => user.id === action.payload
				),
			};

		case SET_USER_PROFILE:
			return {
				...state,
				userProfile: action.payload,
			};

		case DELETE_USER_PROFILE:
			return {
				...state,
				userProfiles: state.userProfiles.filter(
					(user) => user.id !== action.payload
				),
			};

		case UPDATE_USER_PROFILE:
			return {
				...state,
				userProfiles: state.userProfiles.map((user) => {
					if (user.id === action.payload.id) {
						user = action.payload;
					}
					return user;
				}),
			};

		default:
			return state;
	}
};
