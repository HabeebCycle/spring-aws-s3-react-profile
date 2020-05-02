import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../utils/APIUtils";
import { UserDetails } from "./UserDetails";
import { Container, Row, Col } from "react-bootstrap";
import "./ProfileMain.css";
import AddProfile from "./AddProfile";
import store from "../store";
import { setUserProfiles, setFetchError } from "../actions";

export default function ProfileMain() {
	const [loading, setLoading] = useState(false);

	const { userProfiles, errors } = store.getState();

	useEffect(() => {
		setLoading(true);
		fetchAllUsers()
			.then((res) => {
				store.dispatch(setUserProfiles(res.data));
				setLoading(false);
			})
			.catch((err) => {
				store.dispatch(setFetchError(err.message));
				setLoading(false);
			});
	}, []);

	return (
		<div>
			<Container fluid>
				<Row xs={1} md={2}>
					<Col xs={12} md={8}>
						<div className="main_card">
							<Row xs={1} md={2}>
								{loading ? (
									<div className="loading">Loading User Profiles...</div>
								) : errors.fetchError ? (
									<div className="error">{errors.fetchError}</div>
								) : userProfiles.userProfiles.length > 0 ? (
									userProfiles.userProfiles.map((user, index) => (
										<Col key={index}>
											<UserDetails key={index} user={user} />
										</Col>
									))
								) : (
									<div className="no_user">No User Profile Found</div>
								)}
							</Row>
						</div>
					</Col>
					<Col xs={12} md={4}>
						<div className="main_card">
							<AddProfile {...userProfiles.userProfile} />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
