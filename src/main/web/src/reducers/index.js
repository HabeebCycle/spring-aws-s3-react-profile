import { combineReducers } from "redux";
import userProfiles from "./userProfiles";
import errors from "./errors";

export default combineReducers({
	userProfiles,
	errors,
});
