import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Spinner } from "react-bootstrap";
import { updateUserProfile, setUploadError } from "../actions";
import { updateUserImage } from "./APIUtils";
import store from "../store";

export function Dropzone({ id }) {
	const [uploading, setUploading] = useState(false);
	const { errors } = store.getState();

	const onDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file && file.size <= 1024000) {
				const formData = new FormData();
				formData.append("file", file);
				const config = {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				};
				setUploading(true);
				updateUserImage(id, formData, config)
					.then((res) => {
						store.dispatch(updateUserProfile(res.data));
						store.dispatch(setUploadError(null));
						setUploading(false);
					})
					.catch((err) => {
						store.dispatch(setUploadError(err.message));
						setUploading(false);
					});
			} else {
			}
		},
		[id]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone(
		/*only upload single png and jpeg file not more than 1MB */
		{
			onDrop,
			accept: "image/jpeg, image/png",
			maxSize: 1024000,
			multiple: false,
		}
	);

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop here</p>
			) : uploading ? (
				<div>
					<Spinner animation="border" variant="primary" size="sm" />
					<Spinner animation="border" variant="secondary" size="sm" />
					<Spinner animation="border" variant="success" size="sm" />
					<Spinner animation="border" variant="info" size="sm" />
					<Spinner animation="border" variant="danger" size="sm" />
					<Spinner animation="border" variant="warning" size="sm" />
				</div>
			) : errors.uploadError ? (
				<p
					style={{ textAlign: "center", color: "red" }}
					title="Error Occured, try again"
				>
					Error Upload
				</p>
			) : (
				<p
					style={{ textAlign: "center", color: "green" }}
					title="You can also Drag n Drop image here"
				>
					Upload Image
				</p>
			)}
		</div>
	);
}
