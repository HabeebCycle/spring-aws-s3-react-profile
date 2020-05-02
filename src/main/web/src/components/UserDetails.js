import React from "react";
import { API_BASE_URL } from "../constants";
import { Image, Button } from "react-bootstrap";
import user_pic from "../img/userpic.png";
import { Dropzone } from "../utils/Dropzone";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./UserDetails.css";
import store from "../store";
import { getUserProfile, deleteUserProfile, setFetchError } from "../actions";
import { deleteUser } from "../utils/APIUtils";

export function UserDetails({ user }) {
	const { id, name, status, imageLink } = user;

	const editUser = (userId) => {
		store.dispatch(getUserProfile(userId));
	};

	const deleteAUser = (userId) => {
		deleteUser(userId)
			.then((res) => {
				store.dispatch(setFetchError(null));
				store.dispatch(deleteUserProfile(userId));
			})
			.catch((err) => {
				store.dispatch(setFetchError(err.message));
			});
	};

	const confirmation = (userId, delName) =>
		confirmAlert({
			title: "Confirmation",
			message: `You are deleting ${delName} profile, are you sure?`,
			buttons: [
				{
					label: "Yes",
					onClick: () => deleteAUser(userId),
				},
				{
					label: "No",
					onClick: () => {
						return false;
					},
				},
			],
		});

	return (
		<div className="Card">
			<div className="Card__profile">
				<Image
					src={imageLink ? `${API_BASE_URL}/image/${id}` : user_pic}
					alt={name}
					className="Card__pic"
				/>
				<div className="Card__details">
					<h1 className="Card__name">{name}</h1>
					<p className="Card__status">{status ? status : ""}</p>
				</div>
			</div>
			<div
				className="Card__profile"
				style={{ position: "absolute", bottom: "10px" }}
			>
				<div className="dropzone">
					<Dropzone {...user} />
				</div>{" "}
				&nbsp;
				<Button variant="outline-warning" onClick={() => editUser(id)}>
					Edit
				</Button>{" "}
				&nbsp;
				<Button variant="outline-danger" onClick={() => confirmation(id, name)}>
					Delete
				</Button>
			</div>
		</div>
	);
}
