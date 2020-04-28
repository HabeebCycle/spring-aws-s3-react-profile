import React, {useEffect, useState} from 'react';
import { fetchAllUsers } from '../utils/APIUtils';
import { UserDetails } from './UserDetails';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './ProfileMain.css'

export default function ProfileMain() {
    const [userProfiles, setUserProfiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchAllUsers().then(res => {
            setUserProfiles(res.data);
            setLoading(false);
        }).catch(err => {
            setError(err.message);
            setLoading(false);
        })
    }, []);

    return(
        <Container className="main_card">
            <Row xs={1} md={2}>
            {
                loading ? (<p>Loading...</p>) :
                error ? (<div>Error Occured: {error}</div>) :
                (userProfiles.length) > 0 ? 
                    userProfiles.map((user, index) => (
                        <Col>
                            <UserDetails key={index} user={user} />
                        </Col>
                    )) : 
                (<div>No User Profile Found</div>)
            }
            </Row>
        </Container>
        
    );

}
