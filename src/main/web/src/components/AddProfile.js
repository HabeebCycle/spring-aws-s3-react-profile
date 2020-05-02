import React, { useState } from "react";
import "./AddProfile.css";
import { Form, Button, Spinner } from "react-bootstrap";
import store from "../store";
import {
	setUserProfile,
	addUserProfile,
	updateUserProfile,
	setAddError,
} from "../actions";
import { saveUser, updateUser } from "../utils/APIUtils";
import { acceptedTypes } from "../constants";

function AddProfile(userProfile) {
	const state = store.getState();
	const errors = state.errors;

	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [fileLabel, setFileLabel] = useState("No image selected");

	const handleChange = (e) => {
		store.dispatch(
			setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
		);
	};

	const refreshForm = () => {
		store.dispatch(setUserProfile({}));
		setFile(null);
		setFileLabel("No image selected");
		setLoading(false);
	};

	const submitForm = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", file);
		formData.append("user", JSON.stringify(userProfile));
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		let wrongFile = false;
		if (file) {
			if (file.size > 1024000) {
				wrongFile = true;
			}
		}

		if (wrongFile) {
			store.dispatch(setAddError("ERROR! File size exceeded 1MB"));
		} else {
			store.dispatch(setAddError(null));
			setLoading(true);

			if (!userProfile.id) {
				saveUser(formData, config)
					.then((res) => {
						store.dispatch(addUserProfile(res.data));
						refreshForm();
					})
					.catch((err) => {
						store.dispatch(setAddError("ERROR! " + err.message));
						setLoading(false);
					});
			} else {
				updateUser(formData, config)
					.then((res) => {
						store.dispatch(updateUserProfile(res.data));
						refreshForm();
					})
					.catch((err) => {
						store.dispatch(setAddError("ERROR! " + err.message));
						setLoading(false);
					});
			}
		}
	};

	return (
		<div className="add_card">
			{errors.addError ? <p className="status">{errors.addError}</p> : ""}
			<p className="title">Add New User Profile</p>
			<Form onSubmit={submitForm}>
				<Form.Group controlId="formGroupName">
					<Form.Label>*Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Name"
						name="name"
						value={userProfile.name ? userProfile.name : ""}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group controlId="formGroupStatus">
					<Form.Label>Status Quote</Form.Label>
					<Form.Control
						as="textarea"
						rows="4"
						maxLength="180"
						placeholder="Profile Status"
						name="status"
						value={userProfile.status ? userProfile.status : ""}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId="formGroupFile">
					<Form.Label>Add an optional profile image (Max. 1MB)</Form.Label>

					<Form.File
						id="custom-file"
						label={userProfile.imageLink ? "Change profile image" : fileLabel}
						accept={acceptedTypes}
						onChange={(e) => {
							setFile(e.target.files[0]);
							setFileLabel(
								e.target.files[0] ? e.target.files[0].name : "No image selected"
							);
						}}
						custom
					/>
				</Form.Group>
				{loading ? (
					<Button variant="primary" disabled>
						<Spinner
							as="span"
							animation="grow"
							size="sm"
							role="status"
							aria-hidden="true"
						/>{" "}
						&nbsp; Saving...
					</Button>
				) : (
					<Button type="submit">Save Profile</Button>
				)}
			</Form>
		</div>
	);
}

export default AddProfile;
